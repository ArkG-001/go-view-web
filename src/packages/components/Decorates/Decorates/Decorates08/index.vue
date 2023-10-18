<template>
  <div class="go-border-07">
    <svg xmlns="http://www.w3.org/2000/svg" :width="w" :height="h">
      <polyline
        class="g-rect-path stroke fill-none"
        :points="`16.5, ${((h - 33) * (4 - longerHeight)) / 4 + 40} 16.5,${h - 16.5} ${w - 16.5},${h - 16.5} ${
          w - 16.5
        },${((h - 33) * (4 - shorterHeight)) / 4 + 40}`"
      />
      <polyline
        class="g-rect-fill dot1111"
        :points="`16.5, ${((h - 33) * (4 - longerHeight)) / 4 + 40}  16.5,${h - 16.5} ${w - 16.5},${h - 16.5} ${
          w - 16.5
        },${((h - 33) * (4 - shorterHeight)) / 4 + 40}`"
        stroke="#fff"
      />
      <circle
        class="fill"
        cx="16.5"
        :cy="((h - 33) * (4 - longerHeight)) / 4 + 40"
        r="6"
        stroke="none"
        fill="#5eacff"
      />
      <circle
        class="fill"
        :cx="w - 16.5"
        :cy="((h - 33) * (4 - shorterHeight)) / 4 + 40"
        r="6"
        stroke="none"
        fill="#5eacff"
      />
    </svg>
  </div>
</template>

<script setup lang="ts">
import { PropType, toRefs } from 'vue'
import { CreateComponentType } from '@/packages/index.d'
import { getUUID } from '@/utils'
const props = defineProps({
  chartConfig: {
    type: Object as PropType<CreateComponentType>,
    required: true
  }
})

const id = getUUID()
const { w, h } = toRefs(props.chartConfig.attr)
const { colors, dataset, textSize, textColor, shorterHeight, longerHeight } = toRefs(props.chartConfig.option)
console.log(colors, 'dot')

const obj = {
  editCanvasConfig: {
    projectName: '3uy4jxlt4b4000',
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
      id: '3dumdpu0r8q000',
      isGroup: false,
      attr: {
        x: 269,
        y: 208,
        w: 1442,
        h: 704,
        offsetX: 0,
        offsetY: 0,
        zIndex: 1
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
        requestDataType: 0,
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
      key: 'Decorates08',
      chartConfig: {
        key: 'Decorates08',
        chartKey: 'VDecorates08',
        conKey: 'VCDecorates08',
        title: '流动线条',
        category: 'Decorates',
        categoryName: '装饰',
        package: 'Decorates',
        chartFrame: 'static',
        image: 'decorates08.png'
      },
      option: {
        colors: ['#1DC1F533', '#1DC1F5FF', '#36f4fb'],
        dataset: '我是标题',
        textColor: '#fff',
        textSize: 32,
        longerHeight: 4,
        shorterHeight: 1
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
  }
}
</script>

<style lang="scss" scoped>
@include go('border-07') {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    position: absolute;
    z-index: -1;
  }

  .fill {
    fill: v-bind('colors[0]');
  }

  .fill-none {
    fill: none;
  }

  .stroke {
    stroke: v-bind('colors[1]');
  }

  .dot1111 {
    stroke: v-bind('colors[2]');
  }

  .g-rect-path {
    fill: none;
    stroke-width: 3;
    stroke-linejoin: round;
    stroke-linecap: round;
  }

  .g-rect-fill {
    fill: none;
    stroke-width: 5;
    stroke-linejoin: round;
    stroke-linecap: round;
    stroke-dasharray: 3, 900;
    stroke-dashoffset: -100;
    animation: lineMove 3s cubic-bezier(0, 0, 0.74, 0.74) infinite;
  }
}

@keyframes lineMove {
  0% {
    stroke-dashoffset: -0;
  }
  100% {
    stroke-dashoffset: -850;
  }
}
</style>
