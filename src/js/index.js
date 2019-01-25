import { Http, Toast } from 's5-c' // https://www.npmjs.com/package/hc-agg

const App = {
    $root: document.getElementById('root'),
    http: null,
    proxy: {
        // example: '/@url/xxxxx/xxxxx' // 若配置了publicURL，@url即会自动代理
        welcome: 'https://www.easy-mock.com/mock/5c4a79501619df726b225b53/welcome'
    },
    init() {
        this.initHttp()
        this.bindEvents()
        this.getWelcome()
    },
    initHttp() {
        const options = {
            loading: false
        }
        this.http = new Http(options)
    },
    bindEvents() {
        // let imgArr = ['@root/images/test.jpg']

    },
    async getWelcome() {
        const param = {
            a: 1,
            b: 2
        }
        const res = await this.http.get(this.proxy.welcome, param)
        Toast.show(res.data.msg)
    }
}

App.init()
