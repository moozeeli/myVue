const setTest = {
  template: `
        <div class ="setTest">
            <div class="buttonWrap">
                <button @click="list1=datas.datas1">数据1</button>
                <button @click="list1=datas.datas2">数据2</button>
                <button @click="list1=datas.datas3">数据3</button>
            </div>
            <ul >
                <li @click="selectAll()"  :class="{active:isSelectedAll}" >切换全选</li>
                <li v-for="(item,index) in list1" 
                    class="list1"
                    :class="{active:item.selected}"
                    @click="selectItem(item)"
                >{{item.name}}</li>
            </ul>             
            <ul>
               <li class="list2" v-for="(item,index) in list2">{{item.name}}</li>
            </ul>
        </div>
    `,
  data:function(){
    return{
      list1:[ ],
      list2:[ ]
      //  数据仓库，用于切换不同的左侧数据
      ,datas:{
        datas1: [{ "id": "220000198201198509", "name": "何艳" },
          { "id": "230000199909154110", "name": "高刚" },
          { "id": "130000198801124384", "name": "金秀兰" },
          { "id": "640000201405184910", "name": "史秀兰" },
          { "id": "620000198306018468", "name": "康静" },
          { "id": "36000019821019413X", "name": "方杰" }],
        datas2: [{ "id": "45000019761031189X", "name": "龚刚" },
          { "id": "520000197204015364", "name": "顾艳" },
          { "id": "620000197706138915", "name": "杨强" }, 
          { "id": "32000019710110552X", "name": "贾娜" }, 
          { "id": "370000198104225731", "name": "姜洋" }, 
          { "id": "500000200701167626", "name": "戴丽" }, 
          { "id": "440000200107138834", "name": "方强" }
        ],
        datas3:[
          { "id": "150000201307148346", "name": "袁明" },
          { "id": "130000199310253872", "name": "阎娜" },
          { "id": "210000200807119201", "name": "廖勇" },
          { "id": "810000200210171236", "name": "周强" },
          { "id": "440000197708088188", "name": "宋伟" },
          { "id": "620000197601261634", "name": "万秀兰" },
          { "id": "820000200703032412", "name": "易勇" },
          { "id": "150000200009085602", "name": "方平" }
        ]
      }
    };
  },
  mounted(){
        
    for(let i=0;i<10000;i++){
            
      this.datas.datas1.push({ "id": "000001" + i, "name": "1名字" + i });
    }

    for (let i = 0; i < 10000; i++) {

      this.datas.datas2.push({ "id": "000002" + i, "name": "2名字" + i });
    }
    this.list1 = this.datas.datas1;

    // 反选
    // 取交集
    let intersection = this.set1.intersection(this.set2);
    this.list1.forEach(item=>{
      item.selected=false;
      if(intersection.has(item.id)){
        item.selected = true;
      }
    });
  },
  methods:{
    selectAll(){
      let that = this;
      if(this.isSelectedAll){
        that.list1.forEach(item=>{
          item.selected = false;
        });   
        let newAllSet = that.set2.difference(this.set1);
        that.list2 = newAllSet.getArr();

        // 反全选
      }else{ // 全选
        // 并集
        that.list1.forEach(item => {
          item.selected = true;
        }); 
        let newAllSet = that.set1.union(this.set2);
        that.list2 = newAllSet.getArr();
      }
    },
    selectItem(item){
      if (item.selected){
        this.list2.forEach((item2,index)=>{
          if(item2.id==item.id){
            this.list2.splice(index,1);
          }
        });
      }else{
        this.list2.push(item);
      }
      item.selected = !item.selected;
    }
  },
  computed:{
    set1(){
      let arr = this.list1.map(item=>{
        return {
          id:item.id,
          name:item.name,
          toString(){
            return this.id;
          }
        };
      });
      return new Set(arr);
    },
    set2(){
      let arr = this.list2.map(item => {
        return {
          id: item.id,
          name: item.name,
          toString() {
            return this.id;
          }
        };
      });
      return new Set(arr);
    },
    isSelectedAll(){
      // 子集
      return this.set1.isSubsetOf(this.set2);           
    }
  }
};











function Set(arr) {
  var items = {};
  if (Array.isArray(arr)) {
    arr.forEach((item, index) => {
      items[item] = item;
    });
  }
  this.add = function (value) {
    if (!this.has(value)) {
      items[value] = value;
      return true;
    }
    return false;
  };

  this.remove = function (value) {
    if (this.has(value)) {
      delete items[value];
      return true;
    }
    return false;
  };

  this.has = function (value) {
    return items.hasOwnProperty(value);
  };

  this.clear = function () {
    items = {};

  };

  this.values = function () {
    return Object.keys(items);
  };
  this.size = function () {
    return Object.keys(items).length;
  };
  this.print = function () {
    console.log(Object.keys(items));
  };

  //  取集合，此处 应该返回一个副本，因为要
  this.getSet = function () {
    let s_items = JSON.stringify(items);
    return JSON.parse(s_items);
  };
  this.getArr = function () {
    let s_items = JSON.parse(JSON.stringify(items));

    let arr = [];
    for (let i in s_items){
      s_items[i].id&&arr.push(s_items[i]);
    }
    return arr;
  };
  this.getValue = function (key) {
    return items[key];
  };

  //  合并
  this.union = function name(otherSet) {
    var unionSet = new Set();
    var values = this.values();
    values.forEach(element => {
      unionSet.add(this.getValue(element));
    });

    values = otherSet.values();
    values.forEach(element => {
      unionSet.add(otherSet.getValue(element));
    });

    return unionSet;
  };

  //  取交集
  this.intersection = function (otherSet) { 
    var intersectiongSet = new Set();

    var values = this.values();
    values.forEach(item => {
      if (otherSet.has(item)) {
        intersectiongSet.add(item);
      }
    });
    return intersectiongSet;
  };
  this.difference = function (otherSet) {
    let differenceSet = new Set();
    var values = this.values();
    values.forEach(item => {
      if (!otherSet.has(item)) {
        differenceSet.add(this.getValue(item));
      }
    });
    return differenceSet;
  };
  // 判断是否是传入集合的子集(非空子集)
  this.isSubsetOf = function (otherSet) {
    if(this.size()==0){
      return false;
    }
    let values = this.values();
    if (this.size() > otherSet.size()) {
      return false;
    } else {
      for(let i=0;i<values.length;i++){
        let item = values[i];
        if (!otherSet.has(item)) {
          return false;
        }
      }
      return true;
    }
  };
}




// function Set(arr) {
//     var items = [];
//     if (Array.isArray(arr)) {
//         let _arr = JSON.parse(JSON.stringify(arr));
//         items = _arr;
//     }
//     this.add = function (value) {
//         if (!this.has(value)) {
//             items.push(value);
//             return true;
//         }
//         return false;
//     }

//     this.remove = function (value) {
//         for (let i = 0; i < items.length; i++) {
//             if(items[i].id == value.id){
//                 items.splice(i,1);
//             }
//             return true;
//             break;
//         }
//         return false;
//     }

//     this.has = function (value) {
//         for(let i=0;i<items.length;i++){
//             return items[i].id==value.id;
//         }
//         return false;
//     }

//     this.clear = function () {
//         items = [];

//     }

//     this.values = function () {
//         return items;
//     }
//     this.size = function () {
//         return items.length;
//     }
//     this.print = function () {
//         console.log(items.toString());
//     }

//     //  取集合，此处 应该返回一个副本，因为要
//     this.getArr = function () {
//         let s_items = JSON.parse(JSON.stringify(items));
//         return s_items;
//     }

//     this.getValue = function (key) {
//         for (let i = 0; i < items.length; i++) {
//             if(items[i].id == value.id){
//                 return items[i];
//             }
//         }
//         return null;
//     }

//     //  合并
//     this.union = function name(arr) {
//         let _arr = new Set(JSON.parse(JSON.stringify(items)));  
//         arr = arr.getArr();
//         f:for (let j = 0; j < arr.length; j++) {
//             for (let i = 0; i < items.length; i++) {
//                 if (items[i].id === arr[j].id) {
//                    continue f;
//                 } 
//             }
//             _arr.add(arr[j]);
//         }
//         return _arr;
//     }

//     //  取交集
//     this.intersection = function (arr) {

//         let _arr = new Set();
//         // _arr = JSON.parse(JSON.stringify(items));
//         arr = arr.getArr();
//         for (let i = 0; i < items.length; i++) {
//             for (let j = 0; j < arr.length; j++) {
//                 if (items[i].id == arr[j].id) {
//                     _arr.add(arr[j]);
//                 }
//             }
//         }
//         return _arr;
//     }
//     this.difference = function (arr) {
//         let _arr = new Set();  
//         // _arr = JSON.parse(JSON.stringify(items));
//         arr = arr.getArr();
//         for (let i = 0; i < items.length; i++) {
//             for (let j = 0; j < arr.length; j++) {
//                 if (items[i].id !== arr[j].id) {
//                     _arr.add(arr[j]);
//                 }
//             }
//         }
//         return _arr;
//     }
//     // 判断是否是传入集合的子集(非空子集)
//     this.isSubsetOf = function (arr) {
//         // _arr = JSON.parse(JSON.stringify(items));
//         arr = arr.getArr();
//         for (let i = 0; i < items.length; i++) {
//             var b = 0;
//             for (let j = 0; j < arr.length; j++) {
//                 if (items[i].id == arr[j].id) {
//                     b = 1
//                 }
//             }
//             if(b != 1) return false;
//         }
//         return true;

//     }
// }
