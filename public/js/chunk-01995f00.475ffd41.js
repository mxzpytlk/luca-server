(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-01995f00"],{5111:function(t,e,s){"use strict";(function(t){const s={selectionUp:[38],selectionDown:[40],select:[13],hideList:[27],showList:[40],autocomplete:[32,13]},i={input:String,select:Object};function n(t,e){return e.split(".").reduce((t,e)=>t===Object(t)?t[e]:t,t)}function o(t,e){return r(t,e.keyCode)}function r(t,e){if(t.length<=0)return!1;const s=t=>t.some(t=>t===e);return Array.isArray(t[0])?t.some(t=>s(t)):s(t)}function u(t,e,s){return s?e?e(t):t:(t&&t.then||(t=Promise.resolve(t)),e?t.then(e):t)}function l(t){return function(){for(var e=[],s=0;s<arguments.length;s++)e[s]=arguments[s];try{return Promise.resolve(t.apply(this,e))}catch(i){return Promise.reject(i)}}}function h(){}function c(t,e){if(!e)return t&&t.then?t.then(h):Promise.resolve()}function a(t,e){var s=t();return s&&s.then?s.then(e):e(s)}function d(t){var e=t();if(e&&e.then)return e.then(h)}function p(t,e){try{var s=t()}catch(i){return e(i)}return s&&s.then?s.then(void 0,e):s}function g(t,e){try{var s=t()}catch(i){return e()}return s&&s.then?s.then(e,e):e()}var f={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"vue-simple-suggest",class:[t.styles.vueSimpleSuggest,{designed:!t.destyled,focus:t.isInFocus}],on:{keydown:function(e){if(!e.type.indexOf("key")&&t._k(e.keyCode,"tab",9,e.key,"Tab"))return null;t.isTabbed=!0}}},[s("div",{ref:"inputSlot",staticClass:"input-wrapper",class:t.styles.inputWrapper,attrs:{role:"combobox","aria-haspopup":"listbox","aria-owns":t.listId,"aria-expanded":t.listShown&&!t.removeList?"true":"false"}},[t._t("default",[s("input",t._b({staticClass:"default-input",class:t.styles.defaultInput,domProps:{value:t.text||""}},"input",t.$attrs,!1))])],2),t._v(" "),s("transition",{attrs:{name:"vue-simple-suggest"}},[t.listShown&&!t.removeList?s("ul",{staticClass:"suggestions",class:t.styles.suggestions,attrs:{id:t.listId,role:"listbox","aria-labelledby":t.listId}},[this.$scopedSlots["misc-item-above"]?s("li",[t._t("misc-item-above",null,{suggestions:t.suggestions,query:t.text})],2):t._e(),t._v(" "),t._l(t.suggestions,(function(e,i){return s("li",{key:t.getId(e,i),staticClass:"suggest-item",class:[t.styles.suggestItem,{selected:t.isSelected(e),hover:t.isHovered(e)}],attrs:{role:"option","aria-selected":t.isHovered(e)||t.isSelected(e)?"true":"false",id:t.getId(e,i)},on:{mouseenter:function(s){return t.hover(e,s.target)},mouseleave:function(e){return t.hover(void 0)},click:function(s){return t.suggestionClick(e,s)}}},[t._t("suggestion-item",[s("span",[t._v(t._s(t.displayProperty(e)))])],{autocomplete:function(){return t.autocompleteText(e)},suggestion:e,query:t.text})],2)})),t._v(" "),this.$scopedSlots["misc-item-below"]?s("li",[t._t("misc-item-below",null,{suggestions:t.suggestions,query:t.text})],2):t._e()],2):t._e()])],1)},staticRenderFns:[],name:"vue-simple-suggest",inheritAttrs:!1,model:{prop:"value",event:"input"},props:{styles:{type:Object,default:()=>({})},controls:{type:Object,default:()=>s},minLength:{type:Number,default:1},maxSuggestions:{type:Number,default:10},displayAttribute:{type:String,default:"title"},valueAttribute:{type:String,default:"id"},list:{type:[Function,Array],default:()=>[]},removeList:{type:Boolean,default:!1},destyled:{type:Boolean,default:!1},filterByQuery:{type:Boolean,default:!1},filter:{type:Function,default(t,e){return!e||~this.displayProperty(t).toLowerCase().indexOf(e.toLowerCase())}},debounce:{type:Number,default:0},nullableSelect:{type:Boolean,default:!1},value:{},mode:{type:String,default:"input",validator:t=>!!~Object.keys(i).indexOf(t.toLowerCase())}},watch:{mode:{handler(t,e){this.constructor.options.model.event=t,this.$parent&&this.$parent.$forceUpdate(),this.$nextTick(()=>{"input"===t?this.$emit("input",this.text):this.$emit("select",this.selected)})},immediate:!0},value:{handler(t){"string"!==typeof t&&(t=this.displayProperty(t)),this.updateTextOutside(t)},immediate:!0}},data(){return{selected:null,hovered:null,suggestions:[],listShown:!1,inputElement:null,canSend:!0,timeoutInstance:null,text:this.value,isPlainSuggestion:!1,isClicking:!1,isInFocus:!1,isFalseFocus:!1,isTabbed:!1,controlScheme:{},listId:this._uid+"-suggestions"}},computed:{listIsRequest(){return"function"===typeof this.list},inputIsComponent(){return this.$slots.default&&this.$slots.default.length>0&&!!this.$slots.default[0].componentInstance},input(){return this.inputIsComponent?this.$slots.default[0].componentInstance:this.inputElement},on(){return this.inputIsComponent?"$on":"addEventListener"},off(){return this.inputIsComponent?"$off":"removeEventListener"},hoveredIndex(){for(let t=0;t<this.suggestions.length;t++){const e=this.suggestions[t];if(this.hovered&&this.valueProperty(this.hovered)==this.valueProperty(e))return t}return-1},textLength(){return this.text&&this.text.length||this.inputElement.value.length||0},isSelectedUpToDate(){return!!this.selected&&this.displayProperty(this.selected)===this.text}},created(){this.controlScheme=Object.assign({},s,this.controls)},mounted:l((function(){const t=this;return u(t.$slots.default,(function(){t.inputElement=t.$refs["inputSlot"].querySelector("input"),t.inputElement?(t.setInputAriaAttributes(),t.prepareEventHandlers(!0)):console.error("No input element found")}))})),beforeDestroy(){this.prepareEventHandlers(!1)},methods:{isEqual(t,e){return e&&this.valueProperty(t)==this.valueProperty(e)},isSelected(t){return this.isEqual(t,this.selected)},isHovered(t){return this.isEqual(t,this.hovered)},setInputAriaAttributes(){this.inputElement.setAttribute("aria-activedescendant",""),this.inputElement.setAttribute("aria-autocomplete","list"),this.inputElement.setAttribute("aria-controls",this.listId)},prepareEventHandlers(t){const e=this[t?"on":"off"],s={click:this.showSuggestions,keydown:this.onKeyDown,keyup:this.onListKeyUp},i=Object.assign({blur:this.onBlur,focus:this.onFocus,input:this.onInput},s);for(const o in i)this.input[e](o,i[o]);const n=t?"addEventListener":"removeEventListener";for(const o in s)this.inputElement[n](o,s[o])},isScopedSlotEmpty(t){if(t){const e=t(this);return!(Array.isArray(e)||e&&(e.tag||e.context||e.text||e.children))}return!0},miscSlotsAreEmpty(){const t=["misc-item-above","misc-item-below"].map(t=>this.$scopedSlots[t]);if(t.every(t=>!!t))return t.every(this.isScopedSlotEmpty.bind(this));const e=t.find(t=>!!t);return this.isScopedSlotEmpty.call(this,e)},getPropertyByAttribute(t,e){return this.isPlainSuggestion?t:void 0!==typeof t?n(t,e):t},displayProperty(e){if(this.isPlainSuggestion)return e;let s=this.getPropertyByAttribute(e,this.displayAttribute);return"undefined"===typeof s&&(s=JSON.stringify(e),t&&~"production".indexOf("dev")&&console.warn("[vue-simple-suggest]: Please, provide `display-attribute` as a key or a dotted path for a property from your object.")),String(s||"")},valueProperty(t){if(this.isPlainSuggestion)return t;const e=this.getPropertyByAttribute(t,this.valueAttribute);return"undefined"===typeof e&&console.error("[vue-simple-suggest]: Please, check if you passed 'value-attribute' (default is 'id') and 'display-attribute' (default is 'title') props correctly.\n        Your list objects should always contain a unique identifier."),e},autocompleteText(t){this.setText(this.displayProperty(t))},setText(t){this.$nextTick(()=>{this.inputElement.value=t,this.text=t,this.$emit("input",t)})},select(t){(this.selected!==t||this.nullableSelect&&!t)&&(this.selected=t,this.$emit("select",t),t&&this.autocompleteText(t)),this.hover(null)},hover(t,e){const s=t?this.getId(t,this.hoveredIndex):"";this.inputElement.setAttribute("aria-activedescendant",s),t&&t!==this.hovered&&this.$emit("hover",t,e),this.hovered=t},hideList(){this.listShown&&(this.listShown=!1,this.hover(null),this.$emit("hide-list"))},showList(){this.listShown||this.textLength>=this.minLength&&(this.suggestions.length>0||!this.miscSlotsAreEmpty())&&(this.listShown=!0,this.$emit("show-list"))},showSuggestions:l((function(){const t=this;return a((function(){if(0===t.suggestions.length&&t.minLength<=t.textLength)return t.showList(),c(t.research())}),(function(){t.showList()}))})),onShowList(t){o(this.controlScheme.showList,t)&&this.showSuggestions()},moveSelection(t){if(this.listShown&&this.suggestions.length&&o([this.controlScheme.selectionUp,this.controlScheme.selectionDown],t)){t.preventDefault();const e=o(this.controlScheme.selectionDown,t),s=2*e-1,i=e?0:this.suggestions.length-1,n=e?this.hoveredIndex<this.suggestions.length-1:this.hoveredIndex>0;let r=null;r=this.hovered?n?this.suggestions[this.hoveredIndex+s]:this.suggestions[i]:this.selected||this.suggestions[i],this.hover(r)}},onKeyDown(t){const e=this.controlScheme.select,s=this.controlScheme.hideList;"Enter"===t.key&&this.listShown&&r([e,s],13)&&t.preventDefault(),"Tab"===t.key&&this.hovered&&this.select(this.hovered),this.onShowList(t),this.moveSelection(t),this.onAutocomplete(t)},onListKeyUp(t){const e=this.controlScheme.select,s=this.controlScheme.hideList;this.listShown&&o([e,s],t)&&(t.preventDefault(),o(e,t)&&this.select(this.hovered),this.hideList())},onAutocomplete(t){o(this.controlScheme.autocomplete,t)&&(t.ctrlKey||t.shiftKey)&&this.suggestions.length>0&&this.suggestions[0]&&this.listShown&&(t.preventDefault(),this.hover(this.suggestions[0]),this.autocompleteText(this.suggestions[0]))},suggestionClick(t,e){this.$emit("suggestion-click",t,e),this.select(t),this.hideList(),this.isClicking=!1},onBlur(t){this.isInFocus?(this.isClicking=this.hovered&&!this.isTabbed,this.isClicking?t&&t.isTrusted&&!this.isTabbed&&(this.isFalseFocus=!0,setTimeout(()=>{this.inputElement.focus()},0)):(this.isInFocus=!1,this.hideList(),this.$emit("blur",t))):(this.inputElement.blur(),console.error("This should never happen!\n          If you encountered this error, please make sure that your input component emits 'focus' events properly.\n          For more info see https://github.com/KazanExpress/vue-simple-suggest#custom-input.\n\n          If your 'vue-simple-suggest' setup does not include a custom input component - please,\n          report to https://github.com/KazanExpress/vue-simple-suggest/issues/new")),this.isTabbed=!1},onFocus(t){this.isInFocus=!0,t&&!this.isFalseFocus&&this.$emit("focus",t),this.isClicking||this.isFalseFocus||this.showSuggestions(),this.isFalseFocus=!1},onInput(t){const e=t.target?t.target.value:t;this.updateTextOutside(e),this.$emit("input",e)},updateTextOutside(t){this.text!==t&&(this.text=t,this.hovered&&this.hover(null),this.text.length<this.minLength?this.hideList():this.debounce?(clearTimeout(this.timeoutInstance),this.timeoutInstance=setTimeout(this.research,this.debounce)):this.research())},research:l((function(){const t=this;return g((function(){return p((function(){return d((function(){if(t.canSend){t.canSend=!1;let e=t.text;return u(t.getSuggestions(t.text),(function(s){e===t.text&&t.$set(t,"suggestions",s)}))}}))}),(function(e){throw t.clearSuggestions(),e}))}),(function(){return t.canSend=!0,0===t.suggestions.length&&t.miscSlotsAreEmpty()?t.hideList():t.isInFocus&&t.showList(),t.suggestions}))})),getSuggestions:l((function(t){const e=this;if(t=t||"",t.length<e.minLength)return[];e.selected=null,e.listIsRequest&&e.$emit("request-start",t);let s=[];return g((function(){return p((function(){return a((function(){if(e.listIsRequest)return u(e.list(t),(function(t){s=t||[]}));s=e.list}),(function(){Array.isArray(s)||(s=[s]),e.isPlainSuggestion="object"!==typeof s[0]||Array.isArray(s[0]),e.filterByQuery&&(s=s.filter(s=>e.filter(s,t))),e.listIsRequest&&e.$emit("request-done",s)}))}),(function(t){if(!e.listIsRequest)throw t;e.$emit("request-failed",t)}))}),(function(){return e.maxSuggestions&&s.splice(e.maxSuggestions),s}))})),clearSuggestions(){this.suggestions.splice(0)},getId(t,e){return`${this.listId}-suggestion-${this.isPlainSuggestion?e:this.valueProperty(t)||e}`}}};e["a"]=f}).call(this,s("4362"))},"80bf":function(t,e,s){},ecf1:function(t,e,s){"use strict";s.r(e);var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"statistics"},[s("div",{staticClass:"statistics__container"},[s("vue-simple-suggest",{attrs:{placeholder:t._f("locale")("enter_sector_record"),list:t.suggestionTexts,"filter-by-query":!0},model:{value:t.textLookingFor,callback:function(e){t.textLookingFor=e},expression:"textLookingFor"}})],1)])},n=[],o=s("b85c"),r=s("5530"),u=(s("80bf"),s("5111")),l=s("2f62"),h={data:function(){return{textLookingFor:""}},computed:Object(r["a"])(Object(r["a"])({},Object(l["c"])(["sectors"])),{},{suggestionTexts:function(){var t,e=this,s=[],i=Object(o["a"])(e.sectors);try{for(i.s();!(t=i.n()).done;){var n=t.value;s.push(n.title);var r,u=Object(o["a"])(n.records);try{for(u.s();!(r=u.n()).done;){var l=r.value;s.push(l.text)}}catch(h){u.e(h)}finally{u.f()}}}catch(h){i.e(h)}finally{i.f()}return s}}),components:{VueSimpleSuggest:u["a"]}},c=h,a=s("2877"),d=Object(a["a"])(c,i,n,!1,null,null,null);e["default"]=d.exports}}]);
//# sourceMappingURL=chunk-01995f00.475ffd41.js.map