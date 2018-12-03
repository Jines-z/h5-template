import { Http, Toast } from 'hc-agg' // https://www.npmjs.com/package/hc-agg

const App = {
    $root: document.getElementById('root'),
    http: null,
    proxy: {
        // example: '/@url/xxxxx/xxxxx' // 若配置了publicURL，@url即会自动代理
        example: '@root/mock/example.json'
    },
    init() {
        this.initHttp()
        this.bindEvents()
        this.getData()
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
    async getData() {
        const param = {
            a: 1,
            b: 2
        }
        const res = await this.http.get(this.proxy.example, param)
        Toast.show(res.data.msg)
    }
}

App.init()
