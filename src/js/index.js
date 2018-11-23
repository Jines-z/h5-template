import { Http, Toast } from 'hc-agg' // https://www.npmjs.com/package/hc-agg

const main = {
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
        Toast.show('欢迎使用s5-cli')
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
        const data = await this.http.get(this.proxy.example)
        console.log(data)

        // const data = {
        //     a: 1,
        //     b: 2
        // }
        // this.http.post(this.proxy.example, data).then(res => {
        //     do something...
        // })
    }
}

main.init()
