

var todoItem = {	
		props:{
			todo:{
				type:String,
				default:""
			},
			count:{
				type:Number,
				default:0
			}

		},
		template:'<li>{{todo}}  点击了{{mycount}}次<button class="buttonStyle" @click="mycount+=1">按钮计数</button></li>',
		data:function(){
			return {
				mycount:this.count,
			}
		}
		
}