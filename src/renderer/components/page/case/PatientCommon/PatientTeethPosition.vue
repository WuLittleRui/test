<template>
    <div style="padding-left: 20px;">
        <!--十字架-->
        <div class="center" @click="shows(index)">
            <div>{{item.left}}</div>
            <div>{{item.right}}</div>
            <div>{{item.lebottom}}</div>
            <div>{{item.bottom}}</div>
        </div>
        <!--弹框-->
        <el-dialog :visible.sync="item.show" width="750px" :modal-append-to-body='false'>
        	
            <input
                type="checkbox"
                name=""
                id="allId"
                v-model="allData.parCheck"
                @change="allSelect()"
                style="cursor: pointer; position: absolute; bottom: 17px; right: 132px;"
            >
            
            <label
                for="allId"
                style="cursor: pointer; color: #999999; position: absolute; bottom: 15px; right: 95px;"
            >{{allData.text}}</label>
            
            <div class="quxiao" @click="quxiao(index)" style="cursor: pointer; color: #999999; position: absolute; bottom: 15px; right: 40px;">确定</div>
            
            <div style="width: 100%;">
                <ul class="tooth">
                    <div class="hang">
                        <span class="line"></span>
                        <span class="txt">右</span>
                        <span class="line"></span>
                        <span class="line"></span>
                        <span class="txt">左</span>
                        <span class="line"></span>
                    </div>
                    <li v-for="(items, index) in lists" :data-index="index">
                        <div
                            v-show="index <= '15'"
                            style="position: relative;"
                            @mouseleave="mouseleaves(index)"
                        >
                            <img
                                :src="items.imgs"
                                @click="setListCheck(index)"
                                @mouseenter="mouseenters(index)"
                            >
                            <img
                                class="img"
                                :src="items.images"
                                v-show="items.check==true||items.checks==true||items.mover==true"
                                @click="setListCheck(index)"
                            >
                            <span
                                @click="setListCheck(index)"
                                :style="{border:items.border}"
                                v-show="!items.label==''"
                                :class="items.check==true?'active':''"
                                @mouseenter="mouseenters(index)"
                            >
                                <section>{{ items.label }}</section>
                            </span>
                            <p
                                @click="setListChecks(index)"
                                v-show="!items.labels == ''"
                                :class="items.checks==true?'active':''"
                                @mouseenter="mouseenterss(index)"
                            >{{ items.labels }}</p>
                        </div>
                        <div
                            v-show="index >= '16'"
                            style="position: relative;"
                            @mouseleave="mouseleaves(index)"
                        >
                            <h5
                                v-show="index >= '16'&&index <= '18'||index >= '29'&&index <= '31' "
                            ></h5>
                            <p
                                @click="setListChecks(index)"
                                v-show="index >= '19' && index <= '28'"
                                :class="items.checks==true?'active':''"
                                @mouseenter="mouseenterss(index)"
                            >{{ items.labels }}</p>
                            <span
                                @click="setListCheck(index)"
                                :style="{border:items.border}"
                                v-show="!items.label == ''"
                                :class="items.check==true?'active':''"
                                @mouseenter="mouseenters(index)"
                            >
                                <section>{{ items.label }}</section>
                            </span> 
                            <img
                                :src="items.imgs"
                                @click="setListCheck(index)"
                                @mouseenter="mouseenters(index)"
                            >
                            <img
                                class="img"
                                :src="items.images"
                                v-show="items.check==true||items.checks==true||items.mover==true"
                                @click="setListCheck(index)"
                            >
                        </div>
                        <h6 class="aa" v-show="index == '8'"></h6>
                        <h6 class="aa" v-show="index == '24'"></h6>
                    </li>
                </ul>
                <div class="rights" style="float: left;">
                    <div v-for="(items, index) in shige" :data-index="index">
                        <div
                            @click="setListCheckss(index)"
                            :class="items.check==true?'active':''"
                        >{{items.label}}</div>
                    </div>
                </div>
                <div style="clear: both;"></div>
            </div>
        </el-dialog>
    </div>
    <!--弹框完-->
</template>

<script>
import * as config from '@/utils/config';
export default {
  props: ["index", "oindex", "object"],
  watch: {
    'object': {
      handler(value) {
        this.item = value;
      }
    }
  },
  data() {
    return {
      item: {},
      allData: {
        parCheck: false,
        text: "全选"
      },
      ss: "",
      shige: [
        { check: false, label: "19", labels: "9" },
        { check: false, label: "29", labels: "9" },
        { check: false, label: "39", labels: "9" },
        { check: false, label: "49", labels: "9" }
      ],
      lists: [
        {
          check: false,
          mover: false,
          border: "1px solid #ffffff",
          label: "8",
          imgs: config.IMAGES_URL + "/18.png",
          images: config.IMAGES_URL + "/18.png"
        },
        {
          check: false,
          mover: false,
          label: "7",
          imgs: config.IMAGES_URL + "/17.png",
          images: config.IMAGES_URL + "/17.png"
        },
        {
          check: false,
          mover: false,
          label: "6",
          imgs: config.IMAGES_URL + "/16.png",
          images: config.IMAGES_URL + "/16.png"
        },
        {
          check: false,
          mover: false,
          label: "5",
          checks: false,
          labels: "E",
          imgs: config.IMAGES_URL + "/15.png",
          images: config.IMAGES_URL + "/15.png"
        },
        {
          check: false,
          mover: false,
          label: "4",
          checks: false,
          labels: "D",
          imgs: config.IMAGES_URL + "/14.png",
          images: config.IMAGES_URL + "/14.png"
        },
        {
          check: false,
          mover: false,
          label: "3",
          checks: false,
          labels: "C",
          imgs: config.IMAGES_URL + "/13.png",
          images: config.IMAGES_URL + "/13.png"
        },
        {
          check: false,
          mover: false,
          label: "2",
          checks: false,
          labels: "B",
          imgs: config.IMAGES_URL + "/12.png",
          images: config.IMAGES_URL + "/12.png"
        },
        {
          check: false,
          mover: false,
          label: "1",
          checks: false,
          labels: "A",
          imgs: config.IMAGES_URL + "/11.png",
          images: config.IMAGES_URL + "/11.png"
        },
        {
          check: false,
          mover: false,
          label: "1",
          checks: false,
          labels: "A",
          imgs: config.IMAGES_URL + "/21.png",
          images: config.IMAGES_URL + "/21.png"
        },
        {
          check: false,
          mover: false,
          label: "2",
          checks: false,
          labels: "B",
          imgs: config.IMAGES_URL + "/22.png",
          images: config.IMAGES_URL + "/22.png"
        },
        {
          check: false,
          mover: false,
          label: "3",
          checks: false,
          labels: "C",
          imgs: config.IMAGES_URL + "/23.png",
          images: config.IMAGES_URL + "/23.png"
        },
        {
          check: false,
          mover: false,
          label: "4",
          checks: false,
          labels: "D",
          imgs: config.IMAGES_URL + "/24.png",
          images: config.IMAGES_URL + "/24.png"
        },
        {
          check: false,
          mover: false,
          label: "5",
          checks: false,
          labels: "E",
          imgs: config.IMAGES_URL + "/25.png",
          images: config.IMAGES_URL + "/25.png"
        },
        {
          check: false,
          mover: false,
          label: "6",
          imgs: config.IMAGES_URL + "/26.png",
          images: config.IMAGES_URL + "/26.png"
        },
        {
          check: false,
          mover: false,
          label: "7",
          imgs: config.IMAGES_URL + "/27.png",
          images: config.IMAGES_URL + "/27.png"
        },
        {
          check: false,
          mover: false,
          label: "8",
          imgs: config.IMAGES_URL + "/28.png",
          images: config.IMAGES_URL + "/28.png"
        },
        {
          check: false,
          mover: false,
          label: "8",
          imgs: config.IMAGES_URL + "/48.png",
          images: config.IMAGES_URL + "/48.png"
        },
        {
          check: false,
          mover: false,
          label: "7",
          imgs: config.IMAGES_URL + "/47.png",
          images: config.IMAGES_URL + "/47.png"
        },
        {
          check: false,
          mover: false,
          label: "6",
          imgs: config.IMAGES_URL + "/46.png",
          images: config.IMAGES_URL + "/46.png"
        },
        {
          check: false,
          mover: false,
          label: "5",
          checks: false,
          labels: "E",
          imgs: config.IMAGES_URL + "/45.png",
          images: config.IMAGES_URL + "/45.png"
        },
        {
          check: false,
          mover: false,
          label: "4",
          checks: false,
          labels: "D",
          imgs: config.IMAGES_URL + "/44.png",
          images: config.IMAGES_URL + "/44.png"
        },
        {
          check: false,
          mover: false,
          label: "3",
          checks: false,
          labels: "C",
          imgs: config.IMAGES_URL + "/43.png",
          images: config.IMAGES_URL + "/43.png"
        },
        {
          check: false,
          mover: false,
          label: "2",
          checks: false,
          labels: "B",
          imgs: config.IMAGES_URL + "/42.png",
          images: config.IMAGES_URL + "/42.png"
        },
        {
          check: false,
          mover: false,
          label: "1",
          checks: false,
          labels: "A",
          imgs: config.IMAGES_URL + "/41.png",
          images: config.IMAGES_URL + "/41.png"
        },
        {
          check: false,
          mover: false,
          label: "1",
          checks: false,
          labels: "A",
          imgs: config.IMAGES_URL + "/31.png",
          images: config.IMAGES_URL + "/31.png"
        },
        {
          check: false,
          mover: false,
          label: "2",
          checks: false,
          labels: "B",
          imgs: config.IMAGES_URL + "/32.png",
          images: config.IMAGES_URL + "/32.png"
        },
        {
          check: false,
          mover: false,
          label: "3",
          checks: false,
          labels: "C",
          imgs: config.IMAGES_URL + "/33.png",
          images: config.IMAGES_URL + "/33.png"
        },
        {
          check: false,
          mover: false,
          label: "4",
          checks: false,
          labels: "D",
          imgs: config.IMAGES_URL + "/34.png",
          images: config.IMAGES_URL + "/34.png"
        },
        {
          check: false,
          mover: false,
          label: "5",
          checks: false,
          labels: "E",
          imgs: config.IMAGES_URL + "/35.png",
          images: config.IMAGES_URL + "/35.png"
        },
        {
          check: false,
          mover: false,
          label: "6",
          imgs: config.IMAGES_URL + "/36.png",
          images: config.IMAGES_URL + "/36.png"
        },
        {
          check: false,
          mover: false,
          label: "7",
          imgs: config.IMAGES_URL + "/37.png",
          images: config.IMAGES_URL + "/37.png"
        },
        {
          check: false,
          mover: false,
          label: "8",
          imgs: config.IMAGES_URL + "/38.png",
          images: config.IMAGES_URL + "/38.png"
        }
      ]
    };
  },
  methods: {
    shows(index) {
      this.ss = index;
      this.$emit("open", index, this.oindex);
      if(this.item.left == null){
      }else{
        for(var i = 0; i <= 7; i++){
          for(var j = 0; j < this.item.left.split("").length; j++){
            if(this.lists[i].label == this.item.left.split("")[j]){
              this.lists[i].check = true
            }else if(this.lists[i].labels == this.item.left.split("")[j] ){
              this.lists[i].checks = true
            }
          }
        }
        
      }
    },
    editItem(item) {
        this.item = {};
        this.item = item;
    },
    //	全选
    allSelect() {
      var vm = this;
      vm.lists.forEach(item => {
        item.check = vm.allData.parCheck;
      });

      if (vm.allData.parCheck == false) {
        vm.lists.forEach(item => {
          item.checks = false;
        });
        vm.shige.forEach(item => {
          item.check = false;
        });
      }
      this.htmls();
    },
    quxiao(index) {
      this.$emit("close", index, this.oindex);
    },
    setListCheck(index) {
      var check = this.lists[index].check;
      this.lists[index].check = check === true ? false : true;
      var vm = this;
      var selectData = vm.lists.filter(item => {
        return item.check == true;
      });
      selectData.length == vm.lists.length
        ? (vm.allData.parCheck = true)
        : (vm.allData.parCheck = false);
      this.htmls();
    },
    setListChecks(index) {
      var checks = this.lists[index].checks;
      this.lists[index].checks = checks === true ? false : true;
      this.htmls();
    },
    setListCheckss(index) {
      var check = this.shige[index].check;
      this.shige[index].check = check === true ? false : true;
      this.htmls();
    },
    mouseenters(index) {
      this.lists[index].mover = true;
      this.lists[index].border = "1px solid #999999";
    },
    mouseenterss(index) {
      this.lists[index].mover = true;
    },
    mouseleaves(index) {
      this.lists[index].mover = false;
      this.lists[index].border = "1px solid #ffffff";
    },
    htmls() {
      var left = "";
      var right = "";
      var lebottom = "";
      var bottom = "";
      for (var i = 0; i < this.lists.length; i++) {
        if (i <= 7) {
          if (this.lists[i].check == true) {
            left += this.lists[i].label;
            if (this.lists[i].checks == true) {
              left += this.lists[i].labels;
            }
          }
        }
        if (i >= 8 && i <= 15) {
          if (this.lists[i].check == true) {
            right += this.lists[i].label;
            if (this.lists[i].checks == true) {
              right += this.lists[i].labels;
            }
          }
        }
        if (i >= 16 && i <= 23) {
          if (this.lists[i].check == true) {
            lebottom += this.lists[i].label;
            if (this.lists[i].checks == true) {
              lebottom += this.lists[i].labels;
            }
          }
        }
        if (i >= 24 && i <= 31) {
          if (this.lists[i].check == true) {
            bottom += this.lists[i].label;
            if (this.lists[i].checks == true) {
              bottom += this.lists[i].labels;
            }
          }
        }
      }

      for (var i = 0; i < this.shige.length; i++) {
        if (this.shige[i].check == true) {
          if (i == 0) {
            left += this.shige[i].labels;
          } else if (i == 1) {
            right += this.shige[i].labels;
          } else if (i == 2) {
            lebottom += this.shige[i].labels;
          } else if (i == 3) {
            bottom += this.shige[i].labels;
          }
        }
      }

      for (var i = 3; i <= 7; i++) {
        if (this.lists[i].check == false) {
          if (this.lists[i].checks == true) {
            left += this.lists[i].labels;
          }
        }
      }
      for (var i = 8; i <= 15; i++) {
        if (this.lists[i].check == false) {
          if (this.lists[i].checks == true) {
            right += this.lists[i].labels;
          }
        }
      }
      for (var i = 16; i <= 23; i++) {
        if (this.lists[i].check == false) {
          if (this.lists[i].checks == true) {
            lebottom += this.lists[i].labels;
          }
        }
      }
      for (var i = 24; i <= 31; i++) {
        if (this.lists[i].check == false) {
          if (this.lists[i].checks == true) {
            bottom += this.lists[i].labels;
          }
        }
      }
     var a = {};
      a.left = left;
      a.right = right;
      a.lebottom = lebottom;
      a.bottom = bottom;
      this.$emit("value", this.ss, a, this.oindex);
    }
  }
};
</script>


<style scoped>
/*口腔牙齿*/
*{
	text-align: left !important; 
}

.tooth {
  float: left;
  width: 640px;
  background: #ffffff;
  height: 300px;
  position: relative;
}
.tooth .hang {
  height: 60px;
  line-height: 60px;
  text-align: center;
  position: absolute;
  top: 115px;
}
.tooth .hang .line {
  display: inline-block;
  width: 146px;
  border-top: 2px solid #999999;
}
.tooth .hang .txt {
  color: #999999;
  vertical-align: middle;
  vertical-align: -8%;
  vertical-align: -4px;
}

.tooth li {
  list-style: none;
  float: left;
  height: 150px;
}
.tooth li div {
  clear: both;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin: 5px;
}
/*图片*/
.tooth li div img {
  width: 80%;
  cursor: pointer;
}
.tooth li div .img {
  width: 80%;
  position: absolute;
  left: 0px;
  cursor: pointer;
}
/*数据*/
.tooth li div span {
  width: 30px;
  height: 30px;
  border: 1px solid #ffffff;
  display: block;
  text-align: center;
  border-radius: 50%;
  margin: 5px 0;
  cursor: pointer;
  color: #999999;
  
}
.tooth li div span section {
  width: 30px;
  height: 30px;
  border: 1px solid #ffffff;
  display: block;
  text-align: center;
  border-radius: 50%;
  margin: 5px 0;
  cursor: pointer;
  color: #999999;
  text-align: center !important;
}

.tooth li div span:hover {
  width: 30px;
  height: 30px;
  display: block;
  text-align: center;
  border-radius: 50%;
  margin: 5px 0;
  cursor: pointer;
  border: 1px solid #999999;
}
.tooth li .active {
  width: 30px;
  height: 30px;
  color: #66b1ff;
  border: 1px solid #66b1ff !important;
  display: block;
  text-align: center;
  border-radius: 50%;
  margin: 5px 0;
  cursor: pointer;
}

.tooth li div p {
  width: 30px;
  height: 30px;
  line-height: 30px;
  border: 1px solid #ffffff;
  display: block;
  text-align: center;
  border-radius: 50%;
  margin: 5px 0;
  cursor: pointer;
  color: #999999;
  text-align: center !important;
}

.tooth li div p:hover {
  width: 30px;
  height: 30px;
  display: block;
  text-align: center;
  border-radius: 50%;
  margin: 5px 0;
  cursor: pointer;
  color: #999999;
  border: 1px solid #999999;
}
.tooth .aa {
  width: 2px;
  height: 150px;
  background: #999999;
  margin-top: -46px;
  margin-left: -1px;
}
/*空白圆圈*/
h5 {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #ffffff;
}

/*表格数据*/
.center {
  margin: 5px 10px;
  float: left;
  position: relative;
  width: 126px;
  height: 70px;
  cursor: pointer;
  
}
.center div {
  width: 60px;
  height: 25px;
  float: left;
  line-height: 25px;
  padding: 0 1px;
  color: #999;
  font-size: 12px;
}



.center div:nth-child(1) {
  border-right: 1px solid #999;
  text-align: right !important;
  direction: rtl;
  unicode-bidi: bidi-override;
}
.center div:nth-child(4) {
  border-left: 1px solid #999;
  border-top: 1px solid #999;
}
.center div:nth-child(3) {
  border-top: 1px solid #999;
  text-align: right !important;
  direction: rtl;
  unicode-bidi: bidi-override;
}

/*19 29 39 49*/
.shows {
  position: absolute;
  z-index: 99;
  width: 725px;
  border: 1px solid #f4f4f5;
  padding-left: 40px;
  background: #ffffff;
}
.shows .quxiao {
  float: right;
  margin-right: 20px;
  cursor: pointer;
  margin-top: 10px;
  color: #999999;
}
.rights {
  margin-left: 10px;
  margin-top: 80px;
}
.rights div {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  line-height: 30px;
  text-align: center;
  margin: 5px;
  cursor: pointer;
}
.rights div div {
  border: 1px solid #ffffff;
  color: #999999;
  text-align: center !important;
}
.rights div div:hover {
  width: 30px;
  height: 30px;
  display: block;
  text-align: center;
  border-radius: 50%;
  cursor: pointer;
  color: #999999;
  border: 1px solid #999999;
}
.rights div > .active {
  border-radius: 50%;
  color: #66b1ff;
  border: 1px solid #66b1ff !important;
}
</style>

