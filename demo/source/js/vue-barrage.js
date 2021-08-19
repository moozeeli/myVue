const MAX_AMOUNT = 20
	const MIN_RUNNERS = 20
	const UNIT_PADDINGTOP = 15
	const UNIT_PADDINGLEFT = 20			
	Vue.component('barrage',{
		data() {
			return {
				d: {
					square_high: 0,
					roads: 0,
					addRunners: 0
				},
				r: {
					init_all_road: [],
					all_road: [],
					map_road: {},
					runner_idx: []
				},
				glo: {
					screen_runners_max: 0,
					play_count: 0,
					runners_play_count: 0 
				},
				help: {
					road_finish: {},
					road_finish_runner: {}
				},
				fail_queue: [],
				global_time_out: {}
			}
		},
		template:`<div class="barrage_wrap">
					<div class="barrage_line"></div>
					<div class="barrage_container"></div>
				</div>`,
		methods: {
			_initBarriage(options) {
				this.d = Object.assign({}, this.d, options)
				this.d.square_high = parseFloat(getComputedStyle(this.d.square).height)
				this.d.roads = (this.d.square_high / this.d.road_high) >> 0
				this.glo.screen_runners_max = this.d.roads * this.d.road_per_runner
				for (let i = 0;i < this.d.roads; i++) {
					this.r.all_road[i] = {
						name: i,
						runner: {},
						amount: 0
					}
					this.r.init_all_road[i] = i
				}
				if (this.d.show_lines) {
					let _lines = '';
					for (let k = 0;k < this.d.roads; k++) {
						_lines += `<div style="height: ${this.d.road_high}px;border-bottom: 1px solid #000;box-sizing: border-box;"></div>`
					}
					document.getElementsByClassName('barrage_line')[0].innerHTML = _lines
				}
				this.d.addRunners = this.d.runners
				if (this.d.runners.length < MIN_RUNNERS) {
					this.d.addRunners = this.shuffle(this.d.runners.concat(this.d.runners, this.d.runners))
				}
				this.d.addRunners.forEach((unit, i) => {
					this.r.map_road[i] = unit
					this.r.runner_idx.push(i)
				})
				this.put_runner_to_road(-1, {})
			},
			getRandomInt(min, max) {
				return Math.floor(Math.random() * (max - min + 1) + min)
			},
			shuffle(arr) {
				let _arr = arr.slice()
				for (let i = 0; i < _arr.length; i++) {
					let j = this.getRandomInt(0, i)
					let t = _arr[i]
					_arr[i] = _arr[j]
					_arr[j] = t
				}
				return _arr
			},
			put_runner_to_road(roadName, aheadOption) {
		   		if (roadName == -1) {
		   			if (this.r.init_all_road.length) {
		   				this.match_road_to_runner(this.r.init_all_road[0])
		   				this.r.init_all_road.splice(0, 1)
		   				this.put_runner_to_road(-1, {})
		   			}
		   		}else{
		   			this.match_road_to_runner(roadName, aheadOption)
		   		}
		   	},
		   	match_road_to_runner(roadName, aheadOption) {
		   		let road_data_idx = ''
		   		let roadDatas = this.r.all_road.filter(function(obj, i){
		   			if (obj.name == roadName) { //对跑道和赛跑者进行匹配赛跑
		   				road_data_idx = i
		   				return obj
		   			}
		   		})
		   		if (roadDatas && roadDatas.length) {
		   			let road_data = roadDatas[0]
		   			if (road_data && (road_data.amount >= 0)) {
		   				let runner = this.get_runner()
		   				if (runner) {
		   					road_data.amount++
		   					road_data.runner[runner.mapNumber] = runner.mapObj
		   					if (road_data.amount >= this.d.road_per_runner) {
		   						this.help.road_finish[roadName] = road_data.amount
								this.help.road_finish_runner[roadName] = Object.assign(true, {}, road_data.runner)
								this.r.all_road.splice(road_data_idx, 1)
		   					}
		   					this.go_run(roadName, runner.mapObj, aheadOption)
		   				} else {
		   					this.fail_queue.push({
				   				roadName: roadName,
				   				aheadOption: Object.assign(true, {}, aheadOption)
				   			})
		   				}
		   			}
		   		} else {
		   			this.fail_queue.push({
		   				roadName: roadName,
		   				aheadOption: Object.assign(true, {}, aheadOption)
		   			})
		   		}
		   	},
		   	get_runner() {
		   		let runner_idx = this.r.runner_idx
		   		let runner_idx_length = runner_idx.length
		   		if (runner_idx_length > 0) {
		   			this.glo.runners_play_count++
		   			this.glo.play_count = this.glo.runners_play_count / (this.glo.screen_runners_max + 1) >> 0
		   			let map_code = Math.random() * (runner_idx_length) >> 0
		   			let map_number = runner_idx[map_code]
		   			let map_content = this.r.map_road[map_number]
		   			let runner = this.init_runner(map_number, map_content, this.d.square.querySelector('.unit[has_finish="true"]'))
		   			this.r.runner_idx.splice(map_code, 1)
		   			return runner
		   		} else {
		   			return null
		   		}
		   	},
		   	init_runner(mapNumber, mapContent, $replace) {
		   		let _$div
		   		if (!$replace) {
		   			_$div = document.createElement('div')
					_$div.addEventListener('webkitAnimationEnd', (ev) => {
						this.run_finish(ev)
					})
					_$div.addEventListener('click', (ev) => {
						this.$emit('runClick', ev.target)
					})
					this.d.square.appendChild(_$div)
		   		} else {
		   			_$div = $replace
		   		}
		   		_$div.setAttribute('class', 'unit')
				_$div.setAttribute('has_finish', 'false')
				_$div.setAttribute('map_number', mapNumber)
				_$div.setAttribute('length', mapContent.split('').length)
				_$div.innerHTML = mapContent
				if (_$div.nodeType == 1) {
					_$div.setAttribute('width', parseFloat(window.getComputedStyle(_$div).width) + UNIT_PADDINGLEFT * 2)
					_$div.setAttribute('height', parseFloat(window.getComputedStyle(_$div).height) + UNIT_PADDINGTOP * 2)
				}
				return {
					mapNumber: mapNumber,
					mapObj: _$div
				}
		   	},
		   	go_run(roadName, $runner, aheadOption) {
		   		let delay = 0
		   		if (this.d.road_per_runner < MAX_AMOUNT) {
		   			delay = (1 / Math.sqrt(this.d.road_per_runner)) * (.5 + ((this.glo.play_count > 2) ? 1 : Math.min(Math.random(), .5)) * (Math.abs(Math.sin(roadName)) * 2 + Math.random() * 6))
		   		}
		   		let text_length = $runner.getAttribute('length')
		   		let duration = Math.floor(8 + Math.abs(Math.cos(roadName)) * Math.max(text_length, 4) + Math.random() * Math.max(text_length * 1.5, 10))
				if(this.d.duration){
					duration = this.d.duration
				}
				if(this.d.road_padding){
					$runner.style.top = this.d.road_padding + (roadName % this.d.roads) * this.d.road_high + 'px'
				}else{
					$runner.style.top = (8 + (roadName % this.d.roads) * this.d.road_high + (Math.sin(Math.random() * 50)) * 10) + 'px'
				}
				let width = parseFloat(window.getComputedStyle(this.d.square).width)
				let distance = parseFloat($runner.getAttribute('width'))
				try {
					if(aheadOption.leafTime){
						let realLeafTime = aheadOption.leafTime - parseFloat(delay)
						if (realLeafTime > 0) {
							let maxSpeed = width / realLeafTime
						let maxDuration = (distance + width) / maxSpeed
							duration = Math.max(parseFloat(duration), maxDuration)
						}
					}
				} catch(e) {
					aheadOption = {leafTime: 0}
				}
				$runner.style.animationDelay = delay + 's'
				$runner.style.webkitAnimationDelay = delay + 's'
				$runner.style.animationDuration = duration + 's'
				$runner.style.webkitAnimationDuration = duration + 's'
				let _className = 'unit danmu_unit '
				if(this.glo.play_count == 0) {
					_className += 'danmu_unit_half'
				} else {
					_className += 'danmu_unit_all'
				}
				$runner.setAttribute('class', _className)
				$runner.setAttribute('road_name', roadName)
				delay = parseFloat(delay)
				duration = parseFloat(duration)
				let speed = ((distance + width) / duration)
				let shown_time = ((distance) / speed)
				let next_delay = 0
				if (this.d.road_per_runner < MAX_AMOUNT) {
					next_delay = ((delay + shown_time + (duration - shown_time) / this.d.road_per_runner) * 1000)
					aheadOption.leafTime = (duration - shown_time - (duration - shown_time) / this.d.road_per_runner)
				} else {
					next_delay = ((delay + shown_time) * 1000)
					aheadOption.leafTime = (duration - shown_time)
				}
				(($runner, roadName, next_delay, aheadOption) => {
					if(!window.paused){
						let fun = () => {
							this.put_runner_to_road(roadName, aheadOption)
						}
						let _timeout = setTimeout(() => {
							delete this.global_time_out[_timeout]
							fun()
						}, next_delay)
						this.global_time_out[_timeout] = {
							currentTime: +new Date(),
							delay: next_delay,
							fun: fun
						}
					}
				})($runner, roadName, next_delay, Object.assign(true, {}, aheadOption))
		    },
		    
		    run_finish(ev) {
		   		let _$target = ev.target
				let map_number= _$target.getAttribute('map_number'),
					road_name = _$target.getAttribute('road_name')
				_$target.setAttribute('has_finish', 'true')
		   		let temp_road = this.r.all_road.filter(function(obj, i) {
					if (obj.nameif == road_name) { //Orville's Ideas and Interests
						return obj
					}
				})
				if (temp_road.length) {
					temp_road[0].amount--
					delete temp_road[0].runner[map_number]
				} else {
					this.r.all_road.push({
						name: road_name,
						runner: this.help.road_finish_runner[road_name],
						amount: (this.help.road_finish[road_name] - 1)
					});
					delete this.help.road_finish_runner[road_name]
				}
				_$target.className = 'unit'
				_$target.style.transform = 'translate3d(0, 0, 0)'
				_$target.style.webkitTransform = 'translate3d(0, 0, 0)'
				this.r.runner_idx.push(map_number)
				let fail_unit = this.fail_queue.shift()
				if (fail_unit) {
					this.put_runner_to_road(fail_unit.roadName, fail_unit.aheadOption)
				}
		    },
		   	operate_runner_event(isStop) {
		   		if (isStop) {
		   			this.stop()
		   		} else {
		   			this.begin()
		   		}
		   	},
		   	stop() {
		   		window.paused = true
  				window.pausedTime = +new Date()
				window.paused_delay_funcs = []
				this.r.all_road.forEach(function(data, i) {
					for (let key in data.runner) {
						let $current_runner = data.runner[key]
						$current_runner.style.animationPlayState = 'paused'
						$current_runner.style.webkitAnimationPlayState = 'paused'
					}
				})
				for (let k1 in this.help.road_finish_runner) {
					for (let k2 in this.help.road_finish_runner[k1]) {
						let $current_runner = this.help.road_finish_runner[k1][k2]
						$current_runner.style.animationPlayState = 'paused'
						$current_runner.style.webkitAnimationPlayState = 'paused'
					}
				}
				for (let key in this.global_time_out) {
					clearTimeout(key)
					let currentTime = +new Date()
					this.global_time_out[key].delay = Math.max(0, this.global_time_out[key].delay - (window.pausedTime - this.global_time_out[key].currentTime))
					this.global_time_out[key].currentTime = currentTime
				}
		   	},
		   	begin() {
		   		window.paused = false
				this.r.all_road.forEach(function(data, i) {
					for (let key in data.runner) {
						let $current_runner = data.runner[key]
						$current_runner.style.animationPlayState = 'running'
						$current_runner.style.webkitAnimationPlayState = 'running'
					}
				})
				for (let k1 in this.help.road_finish_runner) {
					for (let k2 in this.help.road_finish_runner[k1]) {
						let $current_runner = this.help.road_finish_runner[k1][k2]
						$current_runner.style.animationPlayState = 'running'
						$current_runner.style.webkitAnimationPlayState = 'running'
					}
				}
				let old_global_time_out = Object.assign(true, {}, this.global_time_out)
				this.global_time_out = {}
				for (let key in old_global_time_out) {
					let currentTime = +new Date();
					((fun, delay, currentTime) => {
						let _timeout = setTimeout(() => {
							delete this.global_time_out[_timeout]
							fun()
						}, delay)
						this.global_time_out[_timeout] = {
							fun: fun,
							delay: delay,
							currentTime: currentTime
						}
					})(old_global_time_out[key].fun, old_global_time_out[key].delay, currentTime)
				}
				old_global_time_out = null
		   	}
		}
	});