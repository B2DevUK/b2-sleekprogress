# b2-sleekprogress

A highly customizable progress system for FiveM featuring multiple visual styles, animations, and extensive styling options.

## Features

- Three distinct progress styles:
  - Circular Progress (with icon)
  - Linear Progress (with icon and label)
  - Minimal Progress (simple and clean)
- Full customization options:
  - Multiple size presets (sm, md, lg)
  - Custom colors (background, progress, text, icons)
  - Flexible positioning
  - Custom offsets
- Animation support
- Control restrictions
- Event handling with callbacks
- Cancellable actions

## Installation

### Production Build
1. Download the latest release
2. Extract the `b2-sleekprogress` folder to your server's resources directory
3. Add `ensure b2-sleekprogress` to your server.cfg

### Development Build
1. Download the development version
2. Install dependencies:
```bash
cd web
npm install
```
3. Build the web interface:
```bash
npm run build
```

## Usage

### Basic Progress
```lua
exports['b2-sleekprogress']:Progress({
    type = 'circular',      -- 'circular', 'linear', or 'minimal'
    duration = 5000,        -- Duration in milliseconds
    label = "Processing",   -- Progress label
})
```

### Styled Progress
```lua
exports['b2-sleekprogress']:Progress({
    type = 'linear',
    duration = 5000,
    label = "Custom Style",
    style = {
        size = 'lg',                           -- 'sm', 'md', or 'lg'
        backgroundColor = 'rgba(0, 0, 0, 0.9)',
        progressColor = '#3b82f6',
        textColor = '#ffffff',
        iconColor = '#3b82f6',
        position = {
            vertical = 'center',               -- 'top', 'center', or 'bottom'
            horizontal = 'right',              -- 'left', 'center', or 'right'
            offsetX = -30,                     -- Optional offset
            offsetY = 0
        }
    }
})
```

### With Controls & Animation
```lua
exports['b2-sleekprogress']:Progress({
    type = 'circular',
    duration = 5000,
    label = "Lockpicking",
    controls = {
        disableMovement = true,
        disableCarMovement = true,
        disableMouse = false,
        disableCombat = true
    },
    animation = {
        animDict = "mini@repair",
        anim = "fixing_a_ped",
        flags = 49
    }
})
```

### With Callbacks
```lua
exports['b2-sleekprogress']:Progress({
    type = 'minimal',
    duration = 3000,
    label = "With Callbacks",
    onStart = function()
        print("Progress started")
    end,
    onComplete = function(success)
        print("Progress complete:", success)
    end,
    onCancel = function()
        print("Progress cancelled")
    end,
    onTick = function(progress)
        print("Progress:", progress)
    end
})
```

## Events
```lua
-- Progress complete
AddEventHandler('b2-sleekprogress:client:complete', function(action)
    print("Action completed:", action)
end)

-- Progress cancelled
AddEventHandler('b2-sleekprogress:client:cancel', function(action)
    print("Action cancelled:", action)
end)
```

## License
This project is licensed under the MIT License - see the LICENSE file for details.