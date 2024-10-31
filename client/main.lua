local function clone(t)
    if type(t) ~= 'table' then return t end
    local res = {}
    for k, v in pairs(t) do
        res[k] = type(v) == 'table' and clone(v) or v
    end
    return res
end

local isDoingAction = false
local currentAction = nil

local function MergeDefaults(options, defaults)
    local result = {}
    for k, v in pairs(defaults) do
        if type(v) == "table" then
            result[k] = options[k] and MergeDefaults(options[k], v) or clone(v)
        else
            result[k] = options[k] ~= nil and options[k] or v
        end
    end
    
    for k, v in pairs(options) do
        if result[k] == nil then
            result[k] = v
        end
    end
    
    return result
end

RegisterNUICallback('progressComplete', function(data, cb)
    local action = currentAction 
    if action then
        if action.onComplete then
            action.onComplete(true)
        end
        if action.label then
            TriggerEvent('b2-sleekprogress:client:complete', action.label)
        else
            TriggerEvent('b2-sleekprogress:client:complete')
        end
    end
    isDoingAction = false
    currentAction = nil
    cb('ok')
end)

RegisterNUICallback('progressCancelled', function(data, cb)
    local action = currentAction
    if action then
        if action.onCancel then
            action.onCancel()
        end
        if action.label then
            TriggerEvent('b2-sleekprogress:client:cancel', action.label)
        else
            TriggerEvent('b2-sleekprogress:client:cancel')
        end
    end
    isDoingAction = false
    currentAction = nil
    cb('ok')
end)

function CustomProgress(params)
    if isDoingAction then return false end
    
    local options = MergeDefaults(params or {}, {
        type = Config.Defaults.type or 'minimal',
        duration = Config.Defaults.duration,
        label = "Processing",
        canCancel = Config.Defaults.canCancel,
        controls = Config.Defaults.controlDisables,
        style = Config.Defaults.style,
        animation = Config.Defaults.animation
    })

    isDoingAction = true
    currentAction = options 

    CreateThread(function()
        if options.animation then
            local anim = options.animation
            RequestAnimDict(anim.animDict)
            while not HasAnimDictLoaded(anim.animDict) do Wait(0) end
            TaskPlayAnim(PlayerPedId(), anim.animDict, anim.anim, 8.0, -8.0, -1, anim.flags, 0, false, false, false)
        end

        while isDoingAction and currentAction == options do
            if options.controls then
                if options.controls.disableMovement then 
                    DisableControlAction(0, 30, true)
                    DisableControlAction(0, 31, true)
                end
                if options.controls.disableCarMovement then
                    DisableControlAction(0, 71, true)
                    DisableControlAction(0, 72, true)
                end
                if options.controls.disableMouse then
                    DisableControlAction(0, 1, true)
                    DisableControlAction(0, 2, true)
                end
                if options.controls.disableCombat then
                    DisableControlAction(0, 24, true)
                    DisableControlAction(0, 25, true)
                end
            end
            Wait(0)
        end

        if options.animation then
            ClearPedTasks(PlayerPedId())
        end
    end)

    if options.onStart then
        options.onStart()
    end

    SendNUIMessage({
        action = 'startProgress',
        data = {
            type = options.type,
            duration = options.duration,
            label = options.label,
            canCancel = options.canCancel,
            icon = options.icon,
            style = options.style
        }
    })

    if options.onTick then
        CreateThread(function()
            local startTime = GetGameTimer()
            while isDoingAction and currentAction == options do
                local elapsed = GetGameTimer() - startTime
                local progress = math.min((elapsed / options.duration) * 100, 100)
                options.onTick(progress)
                Wait(16)
            end
        end)
    end

    CreateThread(function()
        Wait(options.duration)
        if isDoingAction and currentAction == options then
            isDoingAction = false
            currentAction = nil
            if options.onComplete then
                options.onComplete(true)
            end
            TriggerEvent('b2-sleekprogress:client:complete', options.label)
        end
    end)

    return {
        cancel = function()
            if isDoingAction and currentAction == options then
                isDoingAction = false
                currentAction = nil
                SendNUIMessage({ action = 'cancelProgress' })
                if options.onCancel then
                    options.onCancel()
                end
                TriggerEvent('b2-sleekprogress:client:cancel', options.label)
            end
        end,
        isActive = function()
            return isDoingAction and currentAction == options
        end
    }
end

exports('Progress', CustomProgress)