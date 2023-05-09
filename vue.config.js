const path=require('path')  
module.exports = {  
    // 配置路径别名  
    configureWebpack: (config) => {  
        config.resolve.alias['@']=path.resolve(__dirname,"./pageCity");  
        config.resolve.alias['@store']=path.resolve(__dirname,"./store");  
        config.resolve.alias['@minxin']=path.resolve(__dirname,"./mixins");  
        config.resolve.alias['@minxins']=path.resolve(__dirname,"./mixins");  
        config.resolve.alias['@u']=path.resolve(__dirname,"./utils");  
        config.resolve.alias['@util']=path.resolve(__dirname,"./utils");  
        config.resolve.alias['@utils']=path.resolve(__dirname,"./utils");  
        config.resolve.alias['@d']=path.resolve(__dirname,"./directives");  
        config.resolve.alias['@c']=path.resolve(__dirname,"./directives");  
        config.resolve.alias['@img']=path.resolve(__dirname,"./assets/img");  
        config.resolve.alias['@imgs']=path.resolve(__dirname,"./assets/img");  
        config.resolve.alias['img']=path.resolve(__dirname,"./assets/img");  
        config.resolve.alias['imgs']=path.resolve(__dirname,"./assets/img");  
        config.resolve.alias['c']=path.resolve(__dirname,"./components");  
        config.resolve.alias['d']=path.resolve(__dirname,"./directives");  
        config.resolve.alias['u']=path.resolve(__dirname,"./utils");  
        config.resolve.alias['store']=path.resolve(__dirname,"./store");  
        config.resolve.alias['minxins']=path.resolve(__dirname,"./mixins");  
        config.resolve.alias['minxin']=path.resolve(__dirname,"./mixins");  
        config.resolve.alias['minxin']=path.resolve(__dirname,"./mixins");  
    },  
    productionSourceMap: false,  
}  