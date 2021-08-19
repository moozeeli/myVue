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
import ButtonGroup from 'element-ui/lib/button-group.js';
import Table from 'element-ui/lib/table.js';
import TableColumn from 'element-ui/lib/table-column.js';
import DatePicker from 'element-ui/lib/date-picker.js';
import TimeSelect from 'element-ui/lib/time-select.js';
import TimePicker from 'element-ui/lib/time-picker.js';
import Popover from 'element-ui/lib/popover.js';
import Tooltip from 'element-ui/lib/tooltip.js';
import Breadcrumb from 'element-ui/lib/breadcrumb.js';
import BreadcrumbItem from 'element-ui/lib/breadcrumb-item.js';
import Form from 'element-ui/lib/form.js';
import FormItem from 'element-ui/lib/form-item.js';
import Tabs from 'element-ui/lib/tabs.js';
import TabPane from 'element-ui/lib/tab-pane.js';
import Tag from 'element-ui/lib/tag.js';
import Tree from 'element-ui/lib/tree.js';
import Alert from 'element-ui/lib/alert.js';
import Loading from 'element-ui/lib/loading.js';
import Row from 'element-ui/lib/row.js';
import Col from 'element-ui/lib/col.js';
import Upload from 'element-ui/lib/upload.js';
import Card from 'element-ui/lib/card.js';
import Steps from 'element-ui/lib/steps.js';
import Step from 'element-ui/lib/step.js';
import Scrollbar from 'element-ui/lib/scrollbar.js';
import Collapse from 'element-ui/lib/collapse.js';
import CollapseItem from 'element-ui/lib/collapse-item.js';
import Cascader from 'element-ui/lib/cascader.js';
import Transfer from 'element-ui/lib/transfer.js';
import Main from 'element-ui/lib/main.js';
import Link from 'element-ui/lib/link.js';
import Divider from 'element-ui/lib/divider.js';
import Image from 'element-ui/lib/image.js';
import Drawer from 'element-ui/lib/drawer.js';
import Popconfirm from 'element-ui/lib/popconfirm.js';


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
// Vue.use(OptionGroup);
Vue.use(Button);
Vue.use(ButtonGroup);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(DatePicker);
Vue.use(TimeSelect);
Vue.use(TimePicker);
Vue.use(Popover);
Vue.use(Tooltip);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Tag);
Vue.use(Tree);
Vue.use(Alert);
// Vue.use(Slider);
// Vue.use(Icon);
Vue.use(Row);
Vue.use(Col);
Vue.use(Upload);
// Vue.use(Progress);
// Vue.use(Spinner);
// Vue.use(Badge);
Vue.use(Card);
// Vue.use(Rate);
Vue.use(Steps);
Vue.use(Step);
// Vue.use(Carousel);
// Vue.use(CarouselItem);
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(Cascader);
// Vue.use(ColorPicker);
Vue.use(Transfer);
// Vue.use(Container);
// Vue.use(Header);
// Vue.use(Aside);
Vue.use(Main);
// Vue.use(Footer);
// Vue.use(Timeline);
// Vue.use(TimelineItem);
Vue.use(Link);
Vue.use(Divider);
Vue.use(Image);
// Vue.use(Calendar);
// Vue.use(Backtop);
// Vue.use(PageHeader);
// Vue.use(CascaderPanel);
Vue.use(Scrollbar);
Vue.use(Drawer);
Vue.use(Popconfirm);

Vue.use(Loading.directive);

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
