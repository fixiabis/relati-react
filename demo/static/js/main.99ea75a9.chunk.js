(window.webpackJsonp=window.webpackJsonp||[]).push([[0],[,function(t,e,r){"use strict";r.d(e,"b",function(){return n}),r.d(e,"a",function(){return o});var n,a=r(3),i=r(2);!function(t){t[t.C=0]="C",t[t.F=4096]="F",t[t.B=256]="B",t[t.R=16]="R",t[t.L=1]="L",t[t.FR=4112]="FR",t[t.FL=4097]="FL",t[t.BR=272]="BR",t[t.BL=257]="BL",t[t.FF=8192]="FF",t[t.BB=512]="BB",t[t.RR=32]="RR",t[t.LL=2]="LL",t[t.FFRR=8224]="FFRR",t[t.FFLL=8194]="FFLL",t[t.BBRR=544]="BBRR",t[t.BBLL=514]="BBLL",t[t.FFR=8208]="FFR",t[t.FFL=8193]="FFL",t[t.BBR=528]="BBR",t[t.BBL=513]="BBL",t[t.FRR=4128]="FRR",t[t.FLL=4098]="FLL",t[t.BRR=288]="BRR",t[t.BLL=258]="BLL"}(n||(n={}));var o=function(){function t(e,r){Object(a.a)(this,t),this.width=void 0,this.height=void 0,this.length=void 0,this.grids=void 0,this.width=e,this.height=r,this.length=e*r,this.grids=[];for(var n=0;n<e;n++)for(var i=0;i<r;i++){var o=new s(n,i,this);this.grids[o.i]=o}}return Object(i.a)(t,[{key:"getGrid",value:function(t,e){if(t<0||t>=this.width||e<0||e>=this.height)return null;var r=t*this.height+e;return this.grids[r]}}]),t}(),s=function(){function t(e,r,n){Object(a.a)(this,t),this.x=void 0,this.y=void 0,this.i=void 0,this.body=void 0,this.board=void 0,this.board=n,this.x=e,this.y=r,this.i=e*n.height+r}return Object(i.a)(t,[{key:"getGrid",value:function(t,e,r,n){if(void 0===e||void 0===r||void 0===n){var a=t;t=(61440&a)>>12,e=(3840&a)>>8,r=(240&a)>>4,n=15&a}var i=this.x+r-n,o=this.y+e-t;return this.board.getGrid(i,o)}}]),t}()},,,,,,,,,function(t,e,r){"use strict";var n=r(29);r.d(e,"RelatiGame",function(){return n.a});var a=r(17);r.d(e,"RelatiRole",function(){return a.a});r(16);var i=r(30);r.d(e,"RelatiSymbolColor",function(){return i.a});var o=r(20);r.d(e,"RelatiRouter",function(){return o.a});r(19),r(31)},,,,,,function(t,e,r){"use strict";r.d(e,"a",function(){return a});var n=r(3),a=function t(e){Object(n.a)(this,t),this.symbol=e}},function(t,e,r){"use strict";r.d(e,"a",function(){return i});var n=r(3),a=r(2),i=function(){function t(e,r){Object(n.a)(this,t),this.grid=e,this.symbol=r,this.status={}}return Object(a.a)(t,[{key:"is",value:function(t,e){if("string"===typeof t)return this.status[t];var r=t;if("all"===e){var n=!0,a=!1,i=void 0;try{for(var o,s=r[Symbol.iterator]();!(n=(o=s.next()).done);n=!0){var l=o.value;if(!this.status[l])return!1}}catch(v){a=!0,i=v}finally{try{n||null==s.return||s.return()}finally{if(a)throw i}}return!0}var c=!0,u=!1,h=void 0;try{for(var d,f=r[Symbol.iterator]();!(c=(d=f.next()).done);c=!0){var y=d.value;if(this.status[y])return!0}}catch(v){u=!0,h=v}finally{try{c||null==f.return||f.return()}finally{if(u)throw h}}return!1}},{key:"gain",value:function(t){if("string"===typeof t)return this.status[t]=!0;var e=t,r=!0,n=!1,a=void 0;try{for(var i,o=e[Symbol.iterator]();!(r=(i=o.next()).done);r=!0){var s=i.value;this.status[s]=!0}}catch(l){n=!0,a=l}finally{try{r||null==o.return||o.return()}finally{if(n)throw a}}}},{key:"lost",value:function(t){if("string"===typeof t)return this.status[t]=!1;var e=t,r=!0,n=!1,a=void 0;try{for(var i,o=e[Symbol.iterator]();!(r=(i=o.next()).done);r=!0){var s=i.value;this.status[s]=!1}}catch(l){n=!0,a=l}finally{try{r||null==o.return||o.return()}finally{if(n)throw a}}}}]),t}()},,function(t,e,r){"use strict";r.d(e,"a",function(){return s});var n=r(21),a=r(3),i=r(2),o=r(20),s=function(){function t(e,r){Object(a.a)(this,t),this.routeType=e,this.board=r,this.router=void 0,this.router=new o.a(e)}return Object(i.a)(t,[{key:"interrupt",value:function(){var t=!0,e=!1,r=void 0;try{for(var n,a=this.board.grids[Symbol.iterator]();!(t=(n=a.next()).done);t=!0){var i=n.value.body;i&&i.lost("repeater")}}catch(o){e=!0,r=o}finally{try{t||null==a.return||a.return()}finally{if(e)throw r}}}},{key:"recovery",value:function(){var t=!0,e=!1,r=void 0;try{for(var n,a=this.board.grids[Symbol.iterator]();!(t=(n=a.next()).done);t=!0){var i=n.value.body;i&&i.is("launcher")&&this.relati(i)}}catch(o){e=!0,r=o}finally{try{t||null==a.return||a.return()}finally{if(e)throw r}}}},{key:"relati",value:function(t){if(!t.is("repeater")){t.gain("repeater");var e=this.router.getRoutes(t.grid,t.symbol,["receiver"]),r=!0,a=!1,i=void 0;try{for(var o,s=e[Symbol.iterator]();!(r=(o=s.next()).done);r=!0){var l=o.value,c=Object(n.a)(l,1)[0].body;c&&this.relati(c)}}catch(u){a=!0,i=u}finally{try{r||null==s.return||s.return()}finally{if(a)throw i}}}}}]),t}()},function(t,e,r){"use strict";r.d(e,"a",function(){return P});var n=r(3),a=r(2),i=r(1),o=i.b.F,s=i.b.B,l=i.b.R,c=i.b.L,u=i.b.FR,h=i.b.FL,d=i.b.BR,f=i.b.BL,y=i.b.FF,v=i.b.BB,m=i.b.RR,b=i.b.LL,g=i.b.FFRR,p=i.b.FFLL,w=i.b.BBRR,k=i.b.BBLL,R=i.b.FFR,E=i.b.FFL,B=i.b.BBR,O=i.b.BBL,j=i.b.FRR,x=i.b.FLL,F=i.b.BRR,L=i.b.BLL,S=[o,s,l,c,u,h,d,f],C=[[y,o],[v,s],[m,l],[b,c],[g,u],[p,h],[w,d],[k,f]],N=[[R,y,o],[R,u,o],[R,u,l],[E,y,o],[E,h,o],[E,h,c],[B,v,s],[B,d,s],[B,d,l],[O,v,s],[O,f,s],[O,f,c],[j,u,o],[j,m,l],[j,u,l],[x,h,o],[x,b,c],[x,h,c],[F,d,s],[F,m,l],[F,d,l],[L,f,s],[L,b,c],[L,f,c]],P=function(){function t(e){Object(n.a)(this,t),this.routeType=e}return Object(a.a)(t,[{key:"hasRoute",value:function(t,e,r){if("common"===this.routeType){for(var n=0;n<24;n++){var a=t.getGrid(N[n][0]),i=t.getGrid(N[n][1]),o=t.getGrid(N[n][2]);if(a&&a.body&&a.body.symbol===e&&a.body.is(r,"any")&&!i.body&&!o.body)return!0}for(var s=0;s<8;s++){var l=t.getGrid(C[s][0]),c=t.getGrid(C[s][1]);if(l&&l.body&&l.body.symbol===e&&l.body.is(r,"any")&&!c.body)return!0}}for(var u=0;u<8;u++){var h=t.getGrid(S[u]);if(h&&h.body&&h.body.symbol===e&&h.body.is(r,"any"))return!0}return!1}},{key:"getRoutes",value:function(t,e,r){var n=[];if("common"===this.routeType){for(var a=0;a<24;a++){var i=t.getGrid(N[a][0]),o=t.getGrid(N[a][1]),s=t.getGrid(N[a][2]);i&&i.body&&i.body.symbol===e&&i.body.is(r,"any")&&!o.body&&!s.body&&n.push([i,o,s])}for(var l=0;l<8;l++){var c=t.getGrid(C[l][0]),u=t.getGrid(C[l][1]);c&&c.body&&c.body.symbol===e&&c.body.is(r,"any")&&!u.body&&n.push([c,u])}}for(var h=0;h<8;h++){var d=t.getGrid(S[h]);d&&d.body&&d.body.symbol===e&&d.body.is(r,"any")&&n.push([d])}return n}}]),t}()},,,,,,,,,function(t,e,r){"use strict";r.d(e,"a",function(){return c});var n=r(3),a=r(2),i=r(1),o=r(16),s=r(17),l=r(19),c=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[new o.a("O"),new o.a("X")],r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:new i.a(9,9),a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"common";Object(n.a)(this,t),this.players=e,this.board=r,this.routeType=a,this.turn=0,this.signal=void 0,this.router=void 0,this.totalPlayer=void 0,this.winner=null,this.totalPlayer=e.length,this.signal=new l.a(a,r),this.router=this.signal.router}return Object(a.a)(t,[{key:"nowPlayer",get:function(){return this.players[this.turn%2]}}]),Object(a.a)(t,[{key:"restart",value:function(){this.turn=0,this.winner=null,this.board.grids.forEach(function(t){return delete t.body})}},{key:"onGridSelect",value:function(t){if(t&&!t.body&&!this.winner){var e,r=this.nowPlayer,n=this.totalPlayer;if(this.turn<n)(e=new s.a(t,r.symbol)).gain("launcher");else{if(!this.gridIsPlaceable(t,r.symbol))return;(e=new s.a(t,r.symbol)).gain("receiver")}if(this.turn++,t.body=e,this.signal.interrupt(),this.signal.recovery(),this.turn>=n){for(var a=!1,i=0;i<n;i++){var o=this.nowPlayer;if(this.hasPlaceableGrid(o.symbol)){a=!0;break}this.turn++}a?this.nowPlayer===r&&(this.winner=r.symbol):this.winner=""}}}},{key:"gridIsPlaceable",value:function(t,e){return this.router.hasRoute(t,e,["launcher","repeater"])}},{key:"hasPlaceableGrid",value:function(t){var e=!0,r=!1,n=void 0;try{for(var a,i=this.board.grids[Symbol.iterator]();!(e=(a=i.next()).done);e=!0){var o=a.value;if(!o.body&&this.gridIsPlaceable(o,t))return!0}}catch(s){r=!0,n=s}finally{try{e||null==i.return||i.return()}finally{if(r)throw n}}return!1}},{key:"getPlaceableGrids",value:function(t){var e=[],r=!0,n=!1,a=void 0;try{for(var i,o=this.board.grids[Symbol.iterator]();!(r=(i=o.next()).done);r=!0){var s=i.value;!s.body&&this.gridIsPlaceable(s,t)&&e.push(s)}}catch(l){n=!0,a=l}finally{try{r||null==o.return||o.return()}finally{if(n)throw a}}return e}}]),t}()},function(t,e,r){"use strict";e.a={"":"#888",A:"blueviolet",D:"goldenrod",O:"crimson",R:"seagreen",X:"royalblue"}},function(t,e){},,,,,function(t,e,r){t.exports=r(56)},,,,,function(t,e,r){},function(t,e,r){},function(t,e,r){},function(t,e,r){},function(t,e,r){},function(t,e,r){},,,,,function(t,e,r){},function(t,e,r){},function(t,e,r){},function(t,e,r){},function(t,e,r){},function(t,e,r){"use strict";r.r(e);var n=r(0),a=r.n(n),i=r(32),o=r.n(i),s=(r(41),r(3)),l=r(2),c=r(6),u=r(5),h=r(7),d=(r(42),r(35)),f=r(8),y=r(4),v=r(13),m=r.n(v);r(43);function b(t){var e=Object(y.a)({},t);return e.className=m()(e.className,e.icon),delete e.icon,a.a.createElement("button",e)}r(44);function g(t){var e=Object(y.a)({},t);return e.className=m()(e.className,"button-group"),a.a.createElement("div",e)}r(45);function p(t){var e=Object(y.a)({},t);return e.className=m()(e.className,"page"),a.a.createElement("div",e)}r(46);var w=function(t){function e(t){var r;return Object(s.a)(this,e),(r=Object(c.a)(this,Object(u.a)(e).call(this,t))).state={pathName:""},r}return Object(h.a)(e,t),Object(l.a)(e,[{key:"switchPathTo",value:function(t){this.setState({pathName:t})}},{key:"render",value:function(){var t=this;return this.state.pathName?a.a.createElement(f.a,{to:this.state.pathName}):a.a.createElement(p,{id:"main-page"},a.a.createElement("div",{className:"title"},"Relati"),a.a.createElement(g,null,a.a.createElement(b,{icon:"play",onClick:function(e){return t.switchPathTo("/game")}}),a.a.createElement(b,{icon:"help",onClick:function(e){return t.switchPathTo("/help")}})))}}]),e}(a.a.Component),k=r(18),R=(r(51),function(t){function e(t){var r;return Object(s.a)(this,e),(r=Object(c.a)(this,Object(u.a)(e).call(this,t))).state=Object(k.a)({},t),r}return Object(h.a)(e,t),Object(l.a)(e,null,[{key:"getDerivedStateFromProps",value:function(t,e){return e.initiative?(delete e.initiative,e):Object(k.a)({},t)}}]),Object(l.a)(e,[{key:"userResponse",value:function(t){this.setState({show:!1,initiative:!0}),this.props.onUserResponse&&this.props.onUserResponse(t)}},{key:"render",value:function(){var t,e=this;if(!1===this.state.show)return a.a.createElement(a.a.Fragment,null);switch(this.state.type){case"yorn":t=a.a.createElement(g,null,a.a.createElement(b,{icon:"accept",onClick:function(t){return e.userResponse(!0)}}),a.a.createElement(b,{icon:"reject",onClick:function(t){return e.userResponse(!1)}}));break;case"hint":t=a.a.createElement(g,null,a.a.createElement(b,{icon:"verify",onClick:function(t){return e.userResponse(!0)}}))}return a.a.createElement("div",{className:"message-box-container"},a.a.createElement("div",{className:"message-box"},a.a.createElement("div",{className:"message-icon ".concat(this.state.icon)}),a.a.createElement("div",{className:"message-text"},this.state.text),t))}}]),e}(a.a.Component)),E=(r(52),function(t){function e(t){var r;return Object(s.a)(this,e),(r=Object(c.a)(this,Object(u.a)(e).call(this,t))).width=void 0,r.height=void 0,r.width=5*t.width,r.height=5*t.height,r.state={scaleRatio:0},window.addEventListener("resize",function(t){return r.resize()}),r}return Object(h.a)(e,t),Object(l.a)(e,[{key:"resize",value:function(){var t=document.getElementById(this.props.id);if(t){var e=t.offsetWidth,r=t.offsetHeight,n=.95*Math.min(e/this.width,r/this.height);this.setState({scaleRatio:n})}}},{key:"onBoardClick",value:function(t){var e=this.props.onCoorSelect,r=t.nativeEvent,n=r.offsetX,a=r.offsetY,i=Math.floor(n/5),o=Math.floor(a/5);e&&e({x:i,y:o})}},{key:"componentDidMount",value:function(){this.resize()}},{key:"render",value:function(){for(var t=this,e=this.width,r=this.height,n=this.props,i=this.props,o=i.id,s=i.children,l={height:r,transform:"scale(".concat(this.state.scaleRatio,")"),width:e},c=[],u=[],h=1;h<n.height;h++)c.push(a.a.createElement("path",{key:h,stroke:"#888",strokeWidth:"0.4",d:"M 0 ".concat(5*h," H ").concat(e)}));for(var d=1;d<n.width;d++)u.push(a.a.createElement("path",{key:d,stroke:"#888",strokeWidth:"0.4",d:"M ".concat(5*d," 0 V ").concat(r)}));return a.a.createElement("div",{id:o,className:"board-container"},a.a.createElement("div",{className:"relati-board",style:l},a.a.createElement("svg",{width:e,height:r},s,a.a.createElement("g",{className:"grid-lines"},c,u)),a.a.createElement("div",{onClick:function(e){return t.onBoardClick(e)}})))}}]),e}(a.a.Component));function B(t){var e=t.x,r=t.y,n=t.color,i=5*e+2.5,o=5*r+2.5;return a.a.createElement("circle",{cx:i,cy:o,r:"0.5",fill:n})}var O=r(10),j={O:"m 0 -1.5, a 1.5 1.5, 0 0 1, 0 3, a 1.5 1.5, 0 0 1, 0 -3",X:"m -1.5 -1.5, l 3 3, m 0 -3, l -3 3"};function x(t){var e=t.grid;if(!e.body)return a.a.createElement(a.a.Fragment,null);var r=[],n=5*e.x+2.5,i=5*e.y+2.5,o={d:"M ".concat(n," ").concat(i,", ").concat(j[e.body.symbol]),fill:"none",key:"1",stroke:O.RelatiSymbolColor[e.body.symbol],strokeWidth:"0.6"};return e.body.is("launcher")?(o.strokeWidth="1",r.push(a.a.createElement("path",o)),o.key="2",o.stroke="#f2f2f2",o.strokeWidth="0.5"):e.body.is("repeater")||(o.stroke="#666"),r.push(a.a.createElement("path",o)),a.a.createElement("g",null,r)}var F=r(25),L=r(21),S=r(1);r(53);function C(t){var e=t.grids;if(!e[0])return a.a.createElement(a.a.Fragment,null);var r={d:"M ".concat(e.map(function(t){var e=t.x,r=t.y;return"".concat(5*e+2.5," ").concat(5*r+2.5)}).join(", L ")),fill:"none",stroke:O.RelatiSymbolColor[e[0].body.symbol],strokeWidth:"0.6"};return a.a.createElement("path",r)}var N=function(t){function e(t){var r;return Object(s.a)(this,e),(r=Object(c.a)(this,Object(u.a)(e).call(this,t))).board=void 0,r.unmounted=!1,r.router=void 0,r.state={routes:[],running:!1,turn:t.turn},r.board=new S.a(t.board.width,t.board.height),r.router=new O.RelatiRouter(t.routeType),r}return Object(h.a)(e,t),Object(l.a)(e,null,[{key:"getDerivedStateFromProps",value:function(t,e){return t.turn!==e.turn?{routes:[],running:!1,turn:t.turn}:null}}]),Object(l.a)(e,[{key:"recovery",value:function(t){var e=!0,r=!1,n=void 0;try{for(var a,i=this.board.grids[Symbol.iterator]();!(e=(a=i.next()).done);e=!0){var o=a.value.body;o&&o.is("launcher")&&this.relati(o,t)}}catch(s){r=!0,n=s}finally{try{e||null==i.return||i.return()}finally{if(r)throw n}}}},{key:"relati",value:function(t,e){var r=this,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[];if(!t.is("repeater")){t.gain("repeater");var a=function(){var n=r.router.getRoutes(t.grid,t.symbol,["receiver"]),a=!0,i=!1,o=void 0;try{for(var s,l=n[Symbol.iterator]();!(a=(s=l.next()).done);a=!0){var c=s.value,u=c,h=Object(L.a)(u,1)[0].body;h&&(c=[t.grid].concat(Object(F.a)(c.reverse())),r.relati(h,e,c))}}catch(d){i=!0,o=d}finally{try{a||null==l.return||l.return()}finally{if(i)throw o}}};this.unmounted||(this.state.turn===e?(this.setState({routes:[].concat(Object(F.a)(this.state.routes),[n]),running:!0}),setTimeout(a,250)):a())}}},{key:"interrupt",value:function(){var t=!0,e=!1,r=void 0;try{for(var n,a=this.board.grids[Symbol.iterator]();!(t=(n=a.next()).done);t=!0){var i=n.value.body;i&&i.symbol!==this.props.symbol&&i.lost("repeater")}}catch(o){e=!0,r=o}finally{try{t||null==a.return||a.return()}finally{if(e)throw r}}}},{key:"cloneBoard",value:function(){var t=!0,e=!1,r=void 0;try{for(var n,a=this.props.board.grids[Symbol.iterator]();!(t=(n=a.next()).done);t=!0){var i=n.value,o=i.i,s=i.body,l=this.board.grids[o];s?l.body||(l.body=new O.RelatiRole(l,s.symbol),l.body.status=Object(k.a)({},s.status)):delete l.body}}catch(c){e=!0,r=c}finally{try{t||null==a.return||a.return()}finally{if(e)throw r}}}},{key:"componentDidUpdate",value:function(){this.state.running||(this.cloneBoard(),this.interrupt(),this.recovery(this.props.turn))}},{key:"componentWillUnmount",value:function(){this.unmounted=!0}},{key:"componentDidMount",value:function(){this.unmounted=!1}},{key:"render",value:function(){var t=this,e=this.board.grids.map(function(e,r){var n=t.props.board.grids[r].body;return n?!n.is("repeater")&&e.body&&e.body.lost("repeater"):delete e.body,a.a.createElement(x,{key:r,grid:e})}),r=this.state.routes.map(function(t,e){return a.a.createElement(C,{key:e,grids:t})});return a.a.createElement(a.a.Fragment,null,a.a.createElement("g",{className:"effect-lines"},r),a.a.createElement("g",{className:"effect-grids"},e))}}]),e}(a.a.Component),P=(r(54),function(t){function e(t){var r;return Object(s.a)(this,e),(r=Object(c.a)(this,Object(u.a)(e).call(this,t))).game=new O.RelatiGame,r.selectCoor=function(t){var e=t.x,n=t.y;return r.selectGrid(r.game.board.getGrid(e,n))},r.state={messageBoxConfig:{show:!1},pathName:""},r}return Object(h.a)(e,t),Object(l.a)(e,[{key:"hideMessageBox",value:function(){this.setState({messageBoxConfig:{show:!1}})}},{key:"confirmSwitchPathTo",value:function(t){var e=this;this.setState({messageBoxConfig:{icon:"yorn",onUserResponse:function(r){r?e.switchPathTo(t):e.hideMessageBox()},show:!0,text:"\u78ba\u8a8d\u96e2\u958b",type:"yorn"}})}},{key:"switchPathTo",value:function(t){this.setState({pathName:t})}},{key:"selectGrid",value:function(t){var e=this,r=this.game;if(r.onGridSelect(t),null!==r.winner){var n={icon:"draw",onUserResponse:function(t){t&&r.restart(),e.setState({messageBoxConfig:{show:!1}})},show:!0,text:"\u5e73\u624b",type:"yorn"};""!==r.winner&&(n.icon="".concat(r.winner.toLowerCase(),"win"),n.text="".concat(r.winner,"\u7372\u52dd")),this.setState({messageBoxConfig:n})}else this.forceUpdate()}},{key:"render",value:function(){var t=this;if(this.state.pathName)return a.a.createElement(f.a,{to:this.state.pathName});var e=this.game,r=e.turn,n=e.board,i=e.routeType,o=e.board,s=o.width,l=o.height,c=e.nowPlayer.symbol,u=this.game.getPlaceableGrids(c).map(function(t,e){var r=t.x,n=t.y;return a.a.createElement(B,{key:e,x:r,y:n,color:O.RelatiSymbolColor[c]})});return a.a.createElement(p,{id:"game-page"},a.a.createElement("div",{className:"versus-header"},a.a.createElement("div",{className:"player-o"}),a.a.createElement("div",{className:"versus"}),a.a.createElement("div",{className:"player-x"})),a.a.createElement(E,{id:"game-board",width:s,height:l,onCoorSelect:this.selectCoor},a.a.createElement("g",{className:"hints"},u),a.a.createElement(N,{turn:r,symbol:c,board:n,routeType:i})),a.a.createElement(g,null,a.a.createElement(b,{icon:"exit",onClick:function(e){return t.confirmSwitchPathTo("/main")}})),a.a.createElement(R,this.state.messageBoxConfig))}}]),e}(a.a.Component)),G=(r(55),function(t){function e(t){var r;return Object(s.a)(this,e),(r=Object(c.a)(this,Object(u.a)(e).call(this,t))).game=new O.RelatiGame,r.state={messageBoxConfig:{show:!1},pathName:""},r}return Object(h.a)(e,t),Object(l.a)(e,[{key:"hideMessageBox",value:function(){this.setState({messageBoxConfig:{show:!1}})}},{key:"confirmSwitchPathTo",value:function(t){var e=this;this.setState({messageBoxConfig:{icon:"yorn",onUserResponse:function(r){r?e.switchPathTo(t):e.hideMessageBox()},show:!0,text:"\u78ba\u8a8d\u96e2\u958b",type:"yorn"}})}},{key:"switchPathTo",value:function(t){this.setState({pathName:t})}},{key:"render",value:function(){var t=this;return this.state.pathName?a.a.createElement(f.a,{to:this.state.pathName}):a.a.createElement(p,{id:"help-page"},a.a.createElement("div",{className:"description"},a.a.createElement("h2",null,"\u904a\u6232\u73a9\u6cd5"),a.a.createElement("p",null,"\u904a\u6232\u958b\u59cb\u6642\uff0c\u53ef\u9078\u64c7\u68cb\u76e4\u4e0a\u4efb\u4f55\u7a7a\u683c\u4e0b\u5b50"),a.a.createElement("p",null,"\u904a\u6232\u958b\u59cb\u5f8c\uff0c\u53ea\u80fd\u5728\u68cb\u5b50\u9023\u7dda\u7bc4\u570d\u5167\u4e0b\u5b50"),a.a.createElement("p",null,"\u8de8\u683c\u9023\u7dda\u4e2d\u9593\u7d93\u904e\u7684\u683c\u5b50\u5fc5\u9808\u70ba\u7a7a\u683c\uff0c\u5018\u82e5\u4e4b\u5f8c\u5c0d\u65b9\u4e0b\u5b50\u5728\u7a7a\u683c\u6642\uff0c\u8a72\u9023\u7dda\u5c07\u6703\u5931\u6548"),a.a.createElement("p",null,"\u7576\u539f\u672c\u7684\u9023\u7dda\u5931\u6548\u6642\uff0c\u68cb\u5b50\u5c07\u6703\u5c0b\u627e\u65b0\u7684\u9023\u7dda\u65b9\u5f0f\uff0c\u82e5\u627e\u4e0d\u5230\u6642\uff0c\u8a72\u68cb\u5b50\u7684\u9023\u7dda\u7bc4\u570d\u5c07\u6703\u5931\u6548"),a.a.createElement("p",null,"\u7576\u9023\u7dda\u7bc4\u570d\u5931\u6548\u7684\u68cb\u5b50\u627e\u5230\u65b0\u7684\u9023\u7dda\u65b9\u5f0f\u6642\uff0c\u8a72\u68cb\u5b50\u7684\u9023\u7dda\u7bc4\u570d\u5c07\u6703\u6062\u5fa9"),a.a.createElement("p",null,"\u7576\u5c0d\u65b9\u7121\u6cd5\u7e7c\u7e8c\u4e0b\u5b50\u6642\uff0c\u5373\u70ba\u6211\u65b9\u7684\u52dd\u5229")),a.a.createElement(g,null,a.a.createElement(b,{icon:"exit",onClick:function(){return t.confirmSwitchPathTo("/main")}})),a.a.createElement(R,this.state.messageBoxConfig))}}]),e}(a.a.Component)),T=function(t){function e(){return Object(s.a)(this,e),Object(c.a)(this,Object(u.a)(e).apply(this,arguments))}return Object(h.a)(e,t),Object(l.a)(e,[{key:"render",value:function(){return a.a.createElement(d.a,null,a.a.createElement(f.b,{path:"/(main|menu|home|)",exact:!0,component:w}),a.a.createElement(f.b,{path:"/(game|play)",component:P}),a.a.createElement(f.b,{path:"/help",component:G}))}}]),e}(a.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(a.a.createElement(T,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(t){t.unregister()})}],[[36,1,2]]]);
//# sourceMappingURL=main.99ea75a9.chunk.js.map