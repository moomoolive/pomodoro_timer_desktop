module.exports = {
    css: {
        loaderOptions: {
            scss: {
                prependData: 
                `@import "@/scss/_index.scss";`
            }
        }
    }
}