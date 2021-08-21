import Vue from 'vue'
import App from './App.vue'
import router from './router'
import "element-ui/lib/theme-chalk/index.css";

import Pagination from 'element-ui/lib/pagination.js';
import Dialog from 'element-ui/lib/dialog.js';
import Autocomplete from 'element-ui/lib/autocomplete.js';
import Dropdown from 'element-ui/lib/dropdown.js';
import DropdownMenu from 'element-ui/lib/dropdown-menu.js';
import DropdownItem from 'element-ui/lib/dropdown-item.js';
import Menu from 'element-ui/lib/menu.js';
import Submenu from 'element-ui/lib/submenu.js';
import MenuItem from 'element-ui/lib/menu-item.js';
import MenuItemGroup from 'element-ui/lib/menu-item-group.js';
import Input from 'element-ui/lib/input.js';
import InputNumber from 'element-ui/lib/input-number.js';
import Radio from 'element-ui/lib/radio.js';
import RadioGroup from 'element-ui/lib/radio-group.js';
import RadioButton from 'element-ui/lib/radio-button.js';
import Checkbox from 'element-ui/lib/checkbox.js';
import CheckboxButton from 'element-ui/lib/checkbox-button.js';
import CheckboxGroup from 'element-ui/lib/checkbox-group.js';
import Switch from 'element-ui/lib/switch.js';
import Select from 'element-ui/lib/select.js';
import Option from 'element-ui/lib/option.js';
import Button from 'element-ui/lib/button.js';

Vue.use(Pagination); 
Vue.use(Dialog);
Vue.use(Autocomplete);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Input);
Vue.use(InputNumber);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(RadioButton);
Vue.use(Checkbox);
Vue.use(CheckboxButton);
Vue.use(CheckboxGroup);
Vue.use(Switch);
Vue.use(Select);
Vue.use(Option);

// Vue.prototype.$loading = Loading.service;
// Vue.prototype.$msgbox = MessageBox;
// Vue.prototype.$alert = MessageBox.alert;
// Vue.prototype.$confirm = MessageBox.confirm;
// Vue.prototype.$prompt = MessageBox.prompt;
// Vue.prototype.$notify = Notification;
// Vue.prototype.$message = Message;



Vue.use(Button);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
