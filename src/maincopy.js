const content = {
  componentList: [
    {
      request: {
        requestDataType: 1,
        requestHttpType: 'get',
        requestUrl: '',
        requestInterval: null,
        requestIntervalUnit: 'second',
        requestContentType: 0,
        requestParamsBodyType: 'none',
        requestSQLContent: {
          sql: 'select * from  where'
        },
        requestParams: {
          Body: {
            'form-data': {},
            'x-www-form-urlencoded': {},
            json: '',
            xml: ''
          },
          Header: {},
          Params: {}
        }
      },
      filter: null,
      events: {
        baseEvent: {
          click: null,
          dblclick: null,
          mouseenter: null,
          mouseleave: null
        },
        advancedEvents: {
          vnodeMounted: null,
          vnodeBeforeMount: null
        },
        interactEvents: []
      },
      key: 'TextCommon',
      chartConfig: {
        key: 'TextCommon',
        chartKey: 'VTextCommon',
        conKey: 'VCTextCommon',
        title: '文字',
        category: 'Texts',
        categoryName: '文本',
        package: 'Informations',
        chartFrame: 'common',
        image: 'text_static.png'
      },
      option: {
        link: '',
        linkHead: 'http://',
        dataset: '我是文本',
        fontSize: 20,
        fontColor: '#ffffff',
        paddingX: 10,
        paddingY: 10,
        textAlign: 'center',
        fontWeight: 'normal',
        borderWidth: 0,
        borderColor: '#ffffff',
        borderRadius: 5,
        letterSpacing: 5,
        writingMode: 'horizontal-tb',
        backgroundColor: '#00000000'
      }
    }
  ],
  requestGlobalConfig: {
    requestDataPond: [],
    requestOriginUrl: '',
    requestInterval: 30,
    requestIntervalUnit: 'second',
    requestParams: {
      Body: {
        'form-data': {},
        'x-www-form-urlencoded': {},
        json: '',
        xml: ''
      },
      Params: {}
    }
  }
}
