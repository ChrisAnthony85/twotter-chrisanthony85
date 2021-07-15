module.exports = {
    configureWebpack: {
        devtool: "source-map"
    },
    css: {
        loaderOptions: {
            sass: {
                additionalData: '@import "@/styles/base.scss"; '
            }
        }
    }
}