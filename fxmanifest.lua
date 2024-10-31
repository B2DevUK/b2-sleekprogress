fx_version 'cerulean'
game 'gta5'

name 'b2-sleekprogress'
description 'Advanced progress system with multiple visual styles'
author 'B2DevUK'
version '1.0.0'

ui_page 'web/build/index.html'

client_scripts {
    'client/main.lua'
}


shared_scripts {
    'shared/config.lua'
}

files {
    'web/build/index.html',
    'web/build/**/*'
}