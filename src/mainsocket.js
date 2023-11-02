const content = {
  editCanvasConfig: {
    projectName: '2vkwi8q8gfs000',
    width: 1920,
    height: 1080,
    filterShow: false,
    hueRotate: 0,
    saturate: 1,
    contrast: 1,
    brightness: 1,
    opacity: 1,
    rotateZ: 0,
    rotateX: 0,
    rotateY: 0,
    skewX: 0,
    skewY: 0,
    blendMode: 'normal',
    background: null,
    backgroundImage: null,
    selectColor: true,
    chartThemeColor: 'dark',
    chartCustomThemeColorInfo: null,
    chartThemeSetting: {
      title: {
        show: true,
        textStyle: {
          color: '#BFBFBF',
          fontSize: 18
        },
        subtextStyle: {
          color: '#A2A2A2',
          fontSize: 14
        }
      },
      xAxis: {
        show: true,
        name: '',
        nameGap: 15,
        nameTextStyle: {
          color: '#B9B8CE',
          fontSize: 12
        },
        inverse: false,
        axisLabel: {
          show: true,
          fontSize: 12,
          color: '#B9B8CE',
          rotate: 0
        },
        position: 'bottom',
        axisLine: {
          show: true,
          lineStyle: {
            color: '#B9B8CE',
            width: 1
          },
          onZero: true
        },
        axisTick: {
          show: true,
          length: 5
        },
        splitLine: {
          show: false,
          lineStyle: {
            color: '#484753',
            width: 1,
            type: 'solid'
          }
        }
      },
      yAxis: {
        show: true,
        name: '',
        nameGap: 15,
        nameTextStyle: {
          color: '#B9B8CE',
          fontSize: 12
        },
        inverse: false,
        axisLabel: {
          show: true,
          fontSize: 12,
          color: '#B9B8CE',
          rotate: 0
        },
        position: 'left',
        axisLine: {
          show: true,
          lineStyle: {
            color: '#B9B8CE',
            width: 1
          },
          onZero: true
        },
        axisTick: {
          show: true,
          length: 5
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: '#484753',
            width: 1,
            type: 'solid'
          }
        }
      },
      legend: {
        show: true,
        type: 'scroll',
        x: 'center',
        y: 'top',
        icon: 'circle',
        orient: 'horizontal',
        textStyle: {
          color: '#B9B8CE',
          fontSize: 18
        },
        itemHeight: 15,
        itemWidth: 15,
        pageTextStyle: {
          color: '#B9B8CE'
        }
      },
      grid: {
        show: false,
        left: '10%',
        top: '60',
        right: '10%',
        bottom: '60'
      },
      dataset: null,
      renderer: 'svg'
    },
    previewScaleType: 'fit'
  },
  componentList: [
    {
      id: '29zu1kbsjmo000',
      isGroup: false,
      attr: {
        x: 248,
        y: 127,
        w: 500,
        h: 300,
        offsetX: 0,
        offsetY: 0,
        zIndex: -1
      },
      styles: {
        filterShow: false,
        hueRotate: 0,
        saturate: 1,
        contrast: 1,
        brightness: 1,
        opacity: 1,
        rotateZ: 0,
        rotateX: 0,
        rotateY: 0,
        skewX: 0,
        skewY: 0,
        blendMode: 'normal',
        animations: []
      },
      preview: {
        overFlowHidden: false
      },
      status: {
        lock: false,
        hide: false
      },
      request: {
        requestDataType: 3,
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
        },
        requestDataPondId: '5d0eis1g52o000'
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
      Header: {},
      Params: {}
    }
  },
  requestSocketGlobalConfig: {
    requestOriginUrl: 'ws:/test222',
    requestInterval: 22,
    requestIntervalUnit: 'second',
    requestDataSocket: [
      {
        dataSocketId: '5d0eis1g52o000',
        dataSocketName: 'test222',
        dataSocketRequestConfig: {
          eventName: 'eventName222',
          requestDataType: 3
        }
      }
    ]
  }
}
