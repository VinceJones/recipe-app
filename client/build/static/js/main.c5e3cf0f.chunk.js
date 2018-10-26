(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{26:function(e,t,n){e.exports=n(59)},31:function(e,t,n){},35:function(e,t,n){},37:function(e,t,n){},39:function(e,t,n){},41:function(e,t,n){},43:function(e,t,n){},45:function(e,t,n){},47:function(e,t,n){},49:function(e,t,n){},59:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),i=n(21),s=n.n(i),c=(n(31),n(25)),o=n(6),l=n.n(o),u=n(7),p=n(1),h=n(2),d=n(4),m=n(3),f=n(5),g=n(22),v=n(14),b=n(11),y=n(12),O=(n(35),function(e){function t(){var e,n;Object(p.a)(this,t);for(var a=arguments.length,r=new Array(a),i=0;i<a;i++)r[i]=arguments[i];return(n=Object(d.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(r)))).getContainerClass=function(e){var t="Message-container";switch(e){case"error":t=t.concat(" Message-error");break;case"success":t=t.concat(" Message-success");break;case"warning":t=t.concat(" Message-warning");break;default:return""}return t},n}return Object(f.a)(t,e),Object(h.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null,this.message&&r.a.createElement("div",{className:this.getContainerClass(this.message.status)},r.a.createElement("p",{className:"Message-body"},this.message.text)))}},{key:"message",get:function(){return this.props&&this.props.messageUtility?this.props.messageUtility.getMessage():{}}}]),t}(a.Component)),j=(n(37),function(e){function t(){var e,n;Object(p.a)(this,t);for(var a=arguments.length,r=new Array(a),i=0;i<a;i++)r[i]=arguments[i];return(n=Object(d.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(r)))).componentDidMount=function(){n.props.messageUtility&&!n.props.messageUtility.message.shown&&n.props.messageUtility.toggleMessageShown()},n.componentWillUnmount=Object(u.a)(l.a.mark(function e(){return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!n.props.messageUtility.message.shown){e.next=3;break}return e.next=3,n.props.messageUtility.clearMessages();case 3:case"end":return e.stop()}},e,this)})),n}return Object(f.a)(t,e),Object(h.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("div",null,r.a.createElement(O,{messageUtility:this.props.messageUtility})),r.a.createElement("div",{className:"page container"},r.a.createElement("div",null,r.a.createElement("h1",{className:"Page-title"},this.props.pageTitle)),r.a.createElement("div",null,this.props.children)))}}]),t}(a.Component)),w=function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};Object(p.a)(this,e),this.name=t.name?t.name:"",this.amount=t.amount?t.amount:"",this.measurementType=t.measurementType?t.measurementType:""},E=function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};Object(p.a)(this,e),this.id=t.id?t.id:"",this.name=t.name?t.name:""},k=function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};Object(p.a)(this,e),this.tranformIngredientData=function(e){if(!e)return[new w];var t=[];return e.forEach(function(e){t.push(new w(e))}),t},this.transformTagData=function(e){if(!e)return[new E];var t=[];return e.forEach(function(e){t.push(new E(e))}),t},this.id=""!==t.id?t.id:"",this.name=t.name?t.name:"",this.description=t.description?t.description:"",this.ingredients=this.tranformIngredientData(t.ingredients),this.tags=this.transformTagData(t.tags)},C=function(){function e(){var t=this;Object(p.a)(this,e),this.postRecipe=function(){var e=Object(u.a)(l.a.mark(function e(n){var a,r,i;return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=JSON.stringify(n),r=t.postHeaders,i={method:"POST",headers:r,body:a},console.log("postRecipe",t),e.next=6,t.makeRequest(t.endpoints.postRecipes,i).then(function(e){return e});case 6:return e.abrupt("return",e.sent);case 7:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),this.putRecipe=function(){var e=Object(u.a)(l.a.mark(function e(n){var a,r,i;return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=JSON.stringify(n),r=t.postHeaders,i={method:"PUT",headers:r,body:a},e.next=5,t.makeRequest(t.endpoints.updateRecipe,i).then(function(e){return e});case 5:return e.abrupt("return",e.sent);case 6:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),this.getRecipes=Object(u.a)(l.a.mark(function e(){return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",t.makeRequest(t.endpoints.getRecipes).then(function(e){var t=JSON.parse(e.data),n=[];return t.data.forEach(function(e){n.push(new k(e))}),n}));case 1:case"end":return e.stop()}},e,this)})),this.getRecipeById=function(){var e=Object(u.a)(l.a.mark(function e(n){var a;return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.endpoints.getRecipes+"/"+n,e.next=3,t.makeRequest(a).then(function(e){if(!t.isEmpty(e.data)){var n=JSON.parse(e.data);return void 0!==n?new k(n):void 0}});case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),this.isEmpty=function(e){for(var t in e)if(e.hasOwnProperty(t))return!1;return!0},this.deleteRecipeById=function(){var e=Object(u.a)(l.a.mark(function e(n){var a,r;return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.endpoints.deleteRecipe+"/"+n,r={method:"DELETE"},e.next=4,t.makeRequest(a,r).then(function(e){return JSON.parse(e.data)});case 4:return e.abrupt("return",e.sent);case 5:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),this.makeRequest=function(){var e=Object(u.a)(l.a.mark(function e(n){var a,r=arguments;return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=r.length>1&&void 0!==r[1]?r[1]:{},e.abrupt("return",fetch(t.endpoints.host+n,a).then(function(e){return e.json()}).then(function(e){return e}).catch(function(e){return console.log("error",e),e}));case 2:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),this.endpoints={host:"https://vincentjonesmuth.com:5000",postRecipes:"/recipes/post",updateRecipe:"/recipes/update",deleteRecipe:"/recipes/delete",getRecipes:"/recipes/get"}}return Object(h.a)(e,[{key:"postHeaders",get:function(){var e=new Headers;return e.append("Content-type","application/json"),e.append("Accept","application/json"),e}}]),e}(),R=function(){function e(){Object(p.a)(this,e)}return Object(h.a)(e,[{key:"measurementTypes",get:function(){return[{name:"Each",value:"ea"},{name:"Pinch",value:"pinch"},{name:"Teaspoon(s)",value:"tsp"},{name:"Tablespoon(s)",value:"tbsp"},{name:"Cup(s)",value:"cp"},{name:"Quart(s)",value:"qt"},{name:"Gallon(s)",value:"gl"},{name:"Ounce(s)",value:"oz"},{name:"Pound(s)",value:"lbs"},{name:"Liter(s)",value:"lt"},{name:"Milliliter(s)",value:"ml"},{name:"Gram(s)",value:"gr"},{name:"Kilogram(s)",value:"kilo"}]}},{key:"textAreaConfig",get:function(){return{rows:"10",columns:"30"}}}]),e}(),M=n(16),N=function(e){function t(){var e,n;Object(p.a)(this,t);for(var a=arguments.length,r=new Array(a),i=0;i<a;i++)r[i]=arguments[i];return(n=Object(d.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(r)))).onClick=function(e){n.props.preventDefault&&e.preventDefault(),n.props.onClick()},n}return Object(f.a)(t,e),Object(h.a)(t,[{key:"render",value:function(){return r.a.createElement("a",this.attributes,this.props.text)}},{key:"className",get:function(){var e="btn";return void 0!==this.props.className&&null!==this.props.className&&""!==this.props.className&&(e+=" "+this.props.className),e}},{key:"attributes",get:function(){var e={};return e.href=this.props.link,this.props.isBtn&&(e.role="button"),this.props.onClick&&(e.onClick=this.onClick),this.props.className&&(e.className=this.props.className),Object(b.a)({},e,this.props.attr)}}]),t}(a.Component),S=new R,x=function(e){function t(){var e,n;Object(p.a)(this,t);for(var a=arguments.length,r=new Array(a),i=0;i<a;i++)r[i]=arguments[i];return(n=Object(d.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(r)))).handleFieldChange=function(){return function(e){var t=e.target,a=Object(b.a)({},n.props.ingredient);a[t.name]=t.value,n.props.onChange(a)}},n}return Object(f.a)(t,e),Object(h.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"Ingredient-group"},r.a.createElement("div",{className:"Ingredient-field"},r.a.createElement("label",null,"Name"),r.a.createElement("input",{type:"text",name:"name",value:this.props.ingredient.name,onChange:this.handleFieldChange()})),r.a.createElement("div",{className:"Ingredient-field Ingredient-fieldInline"},r.a.createElement("label",null,"Amount"),r.a.createElement("input",{className:"Ingredient-amount",type:"text",name:"amount",value:this.props.ingredient.amount,onChange:this.handleFieldChange()})),r.a.createElement("div",{className:"Ingredient-field Ingredient-fieldInline"},r.a.createElement("label",null,"Measurement Type"),r.a.createElement("select",{name:"measurementType",value:this.props.ingredient.measurementType,onChange:this.handleFieldChange()},S.measurementTypes.map(function(e,t){return r.a.createElement("option",{value:e.value,key:t},e.name)}))),r.a.createElement("div",{className:"Ingredient-removeBtn"},this.props.showDeleteButton?r.a.createElement(N,{text:"Remove Ingredient",link:"#",className:"btn btn_secondary",isBtn:!0,onClick:this.props.requestDeleteGroup,preventDefault:!0}):null))}}]),t}(a.Component),A=function(e){function t(){var e,n;Object(p.a)(this,t);for(var a=arguments.length,r=new Array(a),i=0;i<a;i++)r[i]=arguments[i];return(n=Object(d.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(r)))).handleFieldChange=function(e){return function(t){var a=Object(M.a)(n.props.ingredients);a[e]=new w(t),n.props.onChange(a)}},n}return Object(f.a)(t,e),Object(h.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement("div",null,r.a.createElement("h4",null,"Ingredients"),r.a.createElement("div",{className:"Ingredient-container"},this.props.ingredients.map(function(t,n){return r.a.createElement(x,{key:n,ingredient:t,onChange:e.handleFieldChange(n),showDeleteButton:e.shouldShowDeleteButton,requestDeleteGroup:function(){return e.props.requestDeleteGroup(n)}})}),r.a.createElement("div",{className:"Ingredient-addBtn"},r.a.createElement(N,{text:"Add Ingredient",link:"#",className:"btn btn_tertiary",isBtn:!0,onClick:this.props.requestAddGroup,preventDefault:!0}))))}},{key:"shouldShowDeleteButton",get:function(){return this.props.ingredients.length>1}}]),t}(a.Component),I=function(e){function t(){var e,n;Object(p.a)(this,t);for(var a=arguments.length,r=new Array(a),i=0;i<a;i++)r[i]=arguments[i];return(n=Object(d.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(r)))).handleFieldChange=function(){return function(e){var t=e.target,a=Object(b.a)({},n.props.tag);a[t.name]=t.value,n.props.onChange(a)}},n}return Object(f.a)(t,e),Object(h.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"TagForm-container"},r.a.createElement("label",{className:"isHidden"},"Tag"),r.a.createElement("input",{className:"TagForm-input",type:"text",name:"name",value:this.props.tag.name,onChange:this.handleFieldChange()}),r.a.createElement(N,{text:"\xd7",link:"#",isBtn:!1,className:"Tag-removeIcon",onClick:function(){return e.props.requestDeleteTag()}}))}},{key:"tag",get:function(){return this.props.tag}}]),t}(a.Component),D=function(e){function t(){var e,n;Object(p.a)(this,t);for(var a=arguments.length,r=new Array(a),i=0;i<a;i++)r[i]=arguments[i];return(n=Object(d.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(r)))).handleFieldChange=function(e){return function(t){var a=Object(M.a)(n.props.tags);a[e]=new E(t),n.props.onChange(a)}},n}return Object(f.a)(t,e),Object(h.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement("div",null,r.a.createElement("h4",null,"Tags"),this.props.tags.map(function(t,n){return r.a.createElement(I,{key:n,tag:t,index:n,onChange:e.handleFieldChange(n),requestDeleteTag:function(){return e.props.requestDeleteTag(n)}})}),r.a.createElement("div",{className:"Tag-addBtn"},r.a.createElement(N,{text:"Add Tag",link:"#",className:"btn btn_tertiary",isBtn:!0,onClick:this.props.requestAddTag,preventDefault:!0})))}}]),t}(a.Component),T=new R,F=function(e){function t(){var e,n;Object(p.a)(this,t);for(var a=arguments.length,r=new Array(a),i=0;i<a;i++)r[i]=arguments[i];return(n=Object(d.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(r)))).handleSubmit=function(){var e=Object(u.a)(l.a.mark(function e(t){return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:n.props.handleSubmit(t);case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),n}return Object(f.a)(t,e),Object(h.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement("form",{className:"Recipe-container",onSubmit:this.props.handleSubmit},r.a.createElement("div",{className:"Recipe-field"},r.a.createElement("label",null,"Name"),r.a.createElement("input",{type:"text",name:"name",value:this.props.recipe.name,onChange:this.props.handleRecipeFieldChange()})),r.a.createElement("div",{className:"Recipe-field"},r.a.createElement("label",null,"Description:"),r.a.createElement("textarea",{name:"description",rows:T.textAreaConfig.rows,cols:T.textAreaConfig.columns,value:this.props.recipe.description,onChange:this.props.handleRecipeFieldChange()})),r.a.createElement(D,{tags:this.props.recipe.tags,onChange:this.props.handleChildFieldChange("tags"),requestDeleteTag:function(t){return e.props.handleDeleteItemFromArray(t,"tags")},requestAddTag:function(){return e.props.handleAddTag()}}),r.a.createElement(A,{ingredients:this.props.recipe.ingredients,onChange:this.props.handleChildFieldChange("ingredients"),requestDeleteGroup:function(t){return e.props.handleDeleteIngredientGroup(t)},requestAddGroup:this.props.handleAddIngredientGroup}),r.a.createElement("div",null,r.a.createElement("input",{className:"btn btn_primary",type:"submit",value:"Submit"})))}}]),t}(a.Component),B=function e(){Object(p.a)(this,e),this.statuses=function(){return{WARNING:"warning",ERROR:"error",SUCCESS:"success"}},this.getPostMessageStatus=function(e){return console.log("getPostMessageStatus saved",e),e?"success":"error"},this.getSavedRecipeMessage=function(e){return e?"Recipe has been saved.":"Recipe has not been saved."},this.getRecipeNotFoundStatus=function(){return"warning"},this.getRecipeNotFoundMessage=function(){return"Recipe could not be found, try adding a new recipe"},this.getRecipeUpdateStatus=function(){return"success"},this.getRecipeUpdateMessage=function(){return(arguments.length>0&&void 0!==arguments[0]?arguments[0]:"")+" recipe has been updated."},this.getRecipeDeleteStatus=function(){return"success"},this.getRecipeDeleteMessage=function(){return(arguments.length>0&&void 0!==arguments[0]?arguments[0]:"")+" recipe has been deleted."},this.getRecipeDeleteFailStatus=function(){return"error"},this.getRecipeDeleteFailMessage=function(){return(arguments.length>0&&void 0!==arguments[0]?arguments[0]:"")+" recipe has not been deleted."}},U=(n(39),new C),P=new B,q=function(e){function t(e){var n;return Object(p.a)(this,t),(n=Object(d.a)(this,Object(m.a)(t).call(this,e))).componentDidMount=Object(u.a)(l.a.mark(function e(){return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n.getRecipeFromPath();case 2:n.setPageTitle();case 3:case"end":return e.stop()}},e,this)})),n.setPageTitle=function(){var e=Object(b.a)({},n.state);""!==n.state.recipe.name&&""!==n.state.recipe.id?e.pageTitle="Edit "+n.state.recipe.name+" recipe":e.pageTitle="Add a Recipe",n.setState(e)},n.getRecipeFromPath=Object(u.a)(l.a.mark(function e(){var t;return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(n.props.match.params.hasOwnProperty("recipeId")){e.next=2;break}return e.abrupt("return");case 2:return t=parseInt(n.props.match.params.recipeId),e.next=5,U.getRecipeById(t).then(function(e){e instanceof k?n.setState({recipe:e}):(n.props.messageUtility.setMessage(P.getRecipeNotFoundStatus(),P.getRecipeNotFoundMessage()),n.props.history.push("/recipe/add"))});case 5:case"end":return e.stop()}},e,this)})),n.handleRecipeFieldChange=function(){return function(e){var t=e.target,a=n.state.recipe;a[t.name]=t.value,n.setState({recipe:a})}},n.handleChildFieldChange=function(e){return function(t){var a=Object(b.a)({},n.state);a.recipe[e]=t,n.setState(a)}},n.handleAddIngredientGroup=function(){var e=n.state.recipe;e.ingredients=e.ingredients.concat([new w]),n.setState({recipe:e})},n.handleAddTag=function(){var e=n.state.recipe;e.tags=e.tags.concat([new E]),n.setState({recipe:e})},n.handleDeleteIngredientGroup=function(e){var t=n.state.recipe;t.ingredients=t.ingredients.filter(function(t,n){return e!==n}),n.setState({recipe:t})},n.handleDeleteItemFromArray=function(e,t){console.log(e,t);var a=n.state.recipe;a[t]=a[t].filter(function(t,n){return e!==n}),n.setState({recipe:a})},n.handleSubmit=function(){var e=Object(u.a)(l.a.mark(function e(t){return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t.preventDefault(),!n.state.recipe.hasOwnProperty("id")||""===n.state.recipe.id||void 0===n.state.recipe.id){e.next=6;break}return e.next=4,U.putRecipe(n.state.recipe).then(function(e){return n.props.messageUtility.setMessage(P.getRecipeUpdateStatus(e.data),P.getRecipeUpdateMessage(n.state.recipe.name)),e});case 4:e.next=8;break;case 6:return e.next=8,U.postRecipe(n.state.recipe).then(function(e){return n.props.messageUtility.setMessage(P.getPostMessageStatus(e.data),P.getSavedRecipeMessage(e.data)),e});case 8:n.props.history.push("/");case 9:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),n.state={recipe:new k,pageTitle:""},n.handleSubmit=n.handleSubmit.bind(Object(y.a)(Object(y.a)(n))),n}return Object(f.a)(t,e),Object(h.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement(j,{pageTitle:this.state.pageTitle,messageUtility:this.props.messageUtility},r.a.createElement(F,{recipe:this.state.recipe,handleSubmit:function(t){return e.handleSubmit(t)},handleRecipeFieldChange:function(){return e.handleRecipeFieldChange()},handleChildFieldChange:function(t){return e.handleChildFieldChange(t)},handleDeleteIngredientGroup:function(t){return e.handleDeleteIngredientGroup(t)},handleDeleteItemFromArray:function(t,n){e.handleDeleteItemFromArray(t,n)},handleAddIngredientGroup:function(){return e.handleAddIngredientGroup()},handleAddTag:function(){return e.handleAddTag()}}))}}]),t}(a.Component),L=(n(41),function(e){function t(){var e,n;Object(p.a)(this,t);for(var a=arguments.length,r=new Array(a),i=0;i<a;i++)r[i]=arguments[i];return(n=Object(d.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(r)))).getShowHideClassName=function(e){return e?"Modal Modal-display":"Modal Modal-hide"},n}return Object(f.a)(t,e),Object(h.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:this.getShowHideClassName(this.props.show)},r.a.createElement("section",{className:"Modal-main"},this.props.children,r.a.createElement("div",{className:"Modal-btnCloseContainer"},r.a.createElement(N,{text:"Close",link:"#",className:"btn btn_tertiary btn_modalClose",isBtn:!0,onClick:function(){return e.props.hideModal()}}))))}}]),t}(a.Component)),G=function(e){function t(){return Object(p.a)(this,t),Object(d.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(f.a)(t,e),Object(h.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement(L,{show:this.props.showModal,hideModal:this.props.hideModal},r.a.createElement("div",{className:"ListRecipe-deleteModal"},r.a.createElement("h3",null,"Are you sure you would like delete ",this.recipeName," recipe?"),r.a.createElement("div",{className:"ListRecipe-buttonGroup"},r.a.createElement(N,{text:"Yes",link:"#",className:"btn btn_secondary",isBtn:!0,onClick:function(){return e.props.handleDeleteRecipe()}}),r.a.createElement(N,{text:"No",link:"#",className:"btn btn_primary",isBtn:!0,onClick:function(){return e.props.hideModal()}}))))}},{key:"recipeName",get:function(){return this.props.deleteRecipe.hasOwnProperty("name")&&void 0!==this.props.deleteRecipe.name&&null!==this.props.deleteRecipe.name&&""!==this.props.deleteRecipe.name?this.props.deleteRecipe.name:"this"}}]),t}(a.Component),_=n(15),H=function(e){function t(){var e,n;Object(p.a)(this,t);for(var a=arguments.length,r=new Array(a),i=0;i<a;i++)r[i]=arguments[i];return(n=Object(d.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(r)))).onClick=function(e){n.props.onClick(n.props.label,e)},n}return Object(f.a)(t,e),Object(h.a)(t,[{key:"getArrowIcon",value:function(e){return e?r.a.createElement("span",null,"\u25bc"):r.a.createElement("span",null,"\u25b2")}},{key:"getContainerClass",value:function(){return this.props.isOpen?"Accordion-container Accordion-selected":"Accordion-container"}},{key:"render",value:function(){return r.a.createElement("div",{className:this.getContainerClass()},r.a.createElement("div",{className:"Accordion-details",onClick:this.onClick},r.a.createElement("div",null,r.a.createElement("h3",{className:"Accordion-title"},this.props.label),r.a.createElement("span",{className:"Accordion-icon"},this.getArrowIcon(this.props.isOpen))),this.props.isOpen&&r.a.createElement("div",null,r.a.createElement("hr",null),r.a.createElement("p",null,this.props.description),r.a.createElement("div",{className:"Accordion-inner"},this.props.children))))}}]),t}(a.Component),J=(n(43),function(e){function t(e){var n;Object(p.a)(this,t),(n=Object(d.a)(this,Object(m.a)(t).call(this,e))).onClick=function(e){var t=Object(y.a)(Object(y.a)(n)),a=t.props.allowMultipleOpen,r=t.state.openSections,i=!!r[e];a?n.setState({openSections:Object(b.a)({},r,Object(_.a)({},e,!i))}):n.setState({openSections:Object(_.a)({},e,!i)})};var a={};return n.props.children.forEach(function(e,t){e.props.isOpen&&(a[e.props.label]=!0)}),n.state={openSections:a},n}return Object(f.a)(t,e),Object(h.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement("li",null,this.props.children.map(function(t,n){return r.a.createElement(H,{key:n,isOpen:!!e.state.openSections[t.props.label],label:t.props.label,description:t.props.description,onClick:e.onClick},t.props.children)}))}}]),t}(a.Component));J.defaultProps={allowMultipleOpen:!1};var W=J,V=function(e){function t(){return Object(p.a)(this,t),Object(d.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(f.a)(t,e),Object(h.a)(t,[{key:"render",value:function(){return r.a.createElement("li",null,r.a.createElement("h3",null,this.props.ingredient.amount," ",this.props.ingredient.measurementType," - ",this.props.ingredient.name),r.a.createElement("div",null))}}]),t}(r.a.Component),K=function(e){function t(){return Object(p.a)(this,t),Object(d.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(f.a)(t,e),Object(h.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement("ul",{className:"ListRecipe-container"},r.a.createElement(W,{allowMultipleOpen:!0},this.props.recipes.map(function(t,n){return r.a.createElement("div",{key:n,label:t.name,description:t.description},r.a.createElement("ul",null,r.a.createElement("h4",null,"Ingredients"),t.ingredients.map(function(e,t){return r.a.createElement(V,{key:t,ingredient:e})})),r.a.createElement("div",null,r.a.createElement(N,{text:"Edit recipe",link:"recipe/edit/"+t.id,className:"btn btn_tertiary",isBtn:!0}),r.a.createElement(N,{text:"Delete recipe",link:"#",className:"btn btn_secondary",isBtn:!0,onClick:function(){return e.props.showModal(t)}})))})))}}]),t}(a.Component),z=function(e){function t(){var e,n;Object(p.a)(this,t);for(var a=arguments.length,r=new Array(a),i=0;i<a;i++)r[i]=arguments[i];return(n=Object(d.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(r)))).filterList=function(e){n.props.filterList(e)},n}return Object(f.a)(t,e),Object(h.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"ListPage-container"},r.a.createElement("form",null,r.a.createElement("fieldset",null,r.a.createElement("input",{type:"text",name:"filterInput",className:"ListPage-filterInput",placeholder:"Search by Recipe name, Ingredient name, or Tag name",onChange:this.filterList}))),r.a.createElement(K,{recipes:this.props.recipes,showModal:function(t){return e.props.showModal(t)}}))}}]),t}(a.Component),Q=n(18),Y=function(){function e(){var t=this;Object(p.a)(this,e),this.setFilterValue=function(e){t.filterValue=e}}return Object(h.a)(e,[{key:"filterItems",value:function(e,t){var n=this;return this.setFilterValue(t),e=e.filter(function(e){return n.getMatchByType(e)})}},{key:"getMatchByType",value:function(e){var t=!1;return"object"===typeof e&&"function"!==typeof e&&(t=this.checkObjectMatch(e)),e instanceof Array&&(t=this.checkArrayMatch(e)),"string"===typeof e&&(t=this.checkStringMatch(e)),t}},{key:"checkObjectMatch",value:function(e){var t=this,n=[];return Object.entries(e).forEach(function(e){var a=Object(Q.a)(e,2),r=(a[0],a[1]);n.push(t.getMatchByType(r))}),n.indexOf(!0)>-1}},{key:"checkArrayMatch",value:function(e){var t=this,n=[];return e.forEach(function(e){n.push(t.getMatchByType(e))}),n.indexOf(!0)>-1}},{key:"checkStringMatch",value:function(e){var t=-1!==e.toLowerCase().search(this.filterValue.toLowerCase());return t||!1}},{key:"_filterItems_BAK",value:function(e,t){var n=t.target.value;e=e.filter(function(e){var t=[];return Object.entries(e).forEach(function(a){var r=Object(Q.a)(a,2),i=r[0],s=r[1],c=!1;if(s instanceof Array){var o=e[i].filter(function(e){return!!e.hasOwnProperty("name")&&-1!==e.name.toLowerCase().search(n.toLowerCase())});c=(o=void 0!==o&&o.length>0)||c}if("string"===typeof s||s instanceof String){var l=-1!==e[i].toLowerCase().search(n.toLowerCase());c=l||c}t.push(c)}),t.indexOf(!0)>-1})}}]),e}(),$=(n(45),new C),X=new B,Z=new Y,ee=function(e){function t(e){var n;return Object(p.a)(this,t),(n=Object(d.a)(this,Object(m.a)(t).call(this,e))).componentDidMount=function(){n.updateStateWithRecipes()},n.showModal=function(e){n.setState({showModal:!0,deleteRecipe:e})},n.hideModal=function(){n.setState({showModal:!1})},n.updateStateWithRecipes=function(){$.getRecipes().then(function(e){e&&e.length>0&&e[0]instanceof k?n.setState({recipes:e,filteredRecipes:e}):n.setState({recipes:[],filteredRecipes:[]})})},n.handleDeleteRecipe=function(){var e=n.state.deleteRecipe;$.deleteRecipeById(e.id).then(function(t){t?n.props.messageUtility.setMessage(X.getRecipeDeleteStatus(),X.getRecipeDeleteMessage(e.name)):n.props.messageUtility.setMessage(X.getRecipeDeleteFailStatus(),X.getRecipeDeleteFailMessage(e.name)),n.setState({showModal:!1}),n.updateStateWithRecipes()})},n.filterList=function(e){if(""!==e.target.value){var t=Z.filterItems(n.state.recipes,e.target.value);n.setState({filteredRecipes:t})}else n.setState({filteredRecipes:n.state.recipes})},n.state={showModal:!1,deleteRecipe:{},recipes:[],filteredRecipes:[]},n}return Object(f.a)(t,e),Object(h.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement(j,{pageTitle:"Recipes",messageUtility:this.props.messageUtility},r.a.createElement(z,{recipes:this.state.filteredRecipes,showModal:function(t){return e.showModal(t)},filterList:function(t){return e.filterList(t)}}),r.a.createElement(G,{showModal:this.state.showModal,handleDeleteRecipe:function(){return e.handleDeleteRecipe()},hideModal:function(){return e.hideModal()},deleteRecipe:this.state.deleteRecipe}))}}]),t}(a.Component),te=function(e){var t=e.path,n=e.text;return r.a.createElement(N,{className:"MainMenu-menuItem",link:t,text:n})},ne=[{path:"/recipe/add",text:"Add a Recipe",className:""},{path:"/",text:"View Recipes",className:""}],ae=(n(47),function(){return r.a.createElement("div",{className:"MainMenu-container"},ne.map(function(e,t){return r.a.createElement(te,{key:t,menuClass:e.className,path:e.path,text:e.text})}))}),re=(n(49),function(e){function t(e){var n;return Object(p.a)(this,t),(n=Object(d.a)(this,Object(m.a)(t).call(this,e))).clearMessages=Object(u.a)(l.a.mark(function e(){return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n.setState(new O);case 2:case"end":return e.stop()}},e,this)})),n.getMessage=function(){return n.state.message.props},n.setMessage=function(){var e=Object(u.a)(l.a.mark(function e(t,a){return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n.setState({message:new O({status:t,text:a})});case 2:case"end":return e.stop()}},e,this)}));return function(t,n){return e.apply(this,arguments)}}(),n.toggleMessageShown=Object(u.a)(l.a.mark(function e(){var t;return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!n.state.message){e.next=5;break}return(t=n.state.message).message.shown=!0!==t.message.shown,e.next=5,n.setState(t);case 5:case"end":return e.stop()}},e,this)})),n.state={message:new O,getMessage:function(){return n.getMessage()},clearMessages:function(){return n.clearMessages()},setMessage:function(e,t){return n.setMessage(e,t)},toggleMessageShown:function(){return n.toggleMessageShown()}},n}return Object(f.a)(t,e),Object(h.a)(t,[{key:"render",value:function(){return r.a.createElement(g.a,null,r.a.createElement("div",{className:"App"},r.a.createElement("header",{className:"App-header"},r.a.createElement(ae,null)),r.a.createElement("section",{className:"App-body"},r.a.createElement(v.c,null,r.a.createElement(ie,{exact:!0,path:"/",component:ee,messageUtility:this.state}),r.a.createElement(ie,{exact:!0,path:"/recipe/add",component:q,messageUtility:this.state}),r.a.createElement(ie,{exact:!0,path:"/recipe/edit/:recipeId",component:q,messageUtility:this.state})))))}}]),t}(a.Component)),ie=function(e){var t=e.component,n=Object(c.a)(e,["component"]);return r.a.createElement(v.a,Object.assign({},n,{render:function(e){return function(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),a=1;a<t;a++)n[a-1]=arguments[a];var i=Object.assign.apply(Object,[{}].concat(n));return r.a.createElement(e,i)}(t,e,n)}}))},se=re;Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(r.a.createElement(se,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[26,2,1]]]);
//# sourceMappingURL=main.c5e3cf0f.chunk.js.map