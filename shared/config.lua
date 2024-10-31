Config = {}

-- These are just the base defaults that can be overridden in any Progress call
Config.Defaults = {
    type = 'minimal',
    duration = 5000,
    canCancel = true,
    controls = {
        disableMovement = true,
        disableCarMovement = true,
        disableMouse = false,
        disableCombat = true
    },
    style = {
        backgroundColor = 'rgba(0, 0, 0, 0.8)',
        progressColor = 'rgb(45, 212, 191)',
        textColor = 'rgb(209, 213, 219)',
        size = 'md',
        position = {
            vertical = 'bottom',
            horizontal = 'center',
            offsetY = 0
        }
    }
}