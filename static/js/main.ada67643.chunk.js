(this["webpackJsonpjoystream-validator-stats"]=this["webpackJsonpjoystream-validator-stats"]||[]).push([[0],{558:function(t,e,a){},560:function(t,e,a){},568:function(t,e){},570:function(t,e){},575:function(t,e){},578:function(t,e){},579:function(t,e){},637:function(t,e){},640:function(t,e){},642:function(t,e){},652:function(t,e){},654:function(t,e){},680:function(t,e){},682:function(t,e){},687:function(t,e){},689:function(t,e){},695:function(t,e){},697:function(t,e){},709:function(t,e){},712:function(t,e){},726:function(t,e){},729:function(t,e){},740:function(t,e,a){"use strict";a.r(e);var n=a(0),r=a.n(n),s=a(45),c=a.n(s),i=(a(558),a(20)),o=a.n(i),u=a(13),l=a(35),h=a(54),d=a(3),p=a(9),f=a(10),b=a(7),k=a(8),v=a.p+"static/media/joystream.f5df567f.svg",m=(a(560),a(1)),x=a(802),j=a(805),g=a(516),O=a(523),w=a(243),S=a.n(w),y=a(390);a.n(y).a.defaultFormat="YYYY-MM-DD HH:mm:ss";Object(O.config)();var E=function(){function t(e){Object(d.a)(this,t),this.endpoint=void 0,this.isReady=void 0,this.api=void 0;var a=e||Object({NODE_ENV:"production",PUBLIC_URL:"/joystream-live",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}).PROVIDER||"ws://127.0.0.1:9944";this.endpoint=a,this.isReady=Object(l.a)(o.a.mark((function t(){var e;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,new x.a({provider:new j.a(a),types:g.types}).isReadyOrError;case 2:return e=t.sent,t.abrupt("return",e);case 4:case"end":return t.stop()}}),t)})))()}return Object(p.a)(t,[{key:"init",get:function(){var t=this;return this.isReady.then((function(e){return t.api=e,t}))}},{key:"totalIssuance",value:function(){var t=Object(l.a)(o.a.mark((function t(e){var a;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(void 0!==e){t.next=6;break}return t.next=3,this.api.query.balances.totalIssuance();case 3:t.t0=t.sent,t.next=9;break;case 6:return t.next=8,this.api.query.balances.totalIssuance.at(e);case 8:t.t0=t.sent;case 9:return a=t.t0,t.abrupt("return",a.toNumber());case 11:case"end":return t.stop()}}),t,this)})));return function(e){return t.apply(this,arguments)}}()},{key:"systemData",value:function(){var t=Object(l.a)(o.a.mark((function t(){var e,a,n,r,s,c;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Promise.all([this.api.rpc.system.chain(),this.api.rpc.system.name(),this.api.rpc.system.version(),this.api.rpc.system.peers()]);case 2:return e=t.sent,a=Object(m.a)(e,4),n=a[0],r=a[1],s=a[2],c=a[3],t.abrupt("return",{chain:n.toString(),nodeName:r.toString(),nodeVersion:s.toString(),peerCount:c.length});case 9:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"finalizedHash",value:function(){var t=Object(l.a)(o.a.mark((function t(){return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",this.api.rpc.chain.getFinalizedHead());case 1:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"finalizedBlockHeight",value:function(){var t=Object(l.a)(o.a.mark((function t(){var e,a,n;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this.finalizedHash();case 2:return e=t.sent,t.next=5,this.api.rpc.chain.getHeader("".concat(e));case 5:return a=t.sent,n=a.number,t.abrupt("return",n.toNumber());case 8:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"getActiveEras",value:function(){var t=Object(l.a)(o.a.mark((function t(e){var a,n,r,s,c,i,u,l,h,d,p,f,b=this;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a=e||"5EhDdcWm4TdqKp1ew1PqtSpoAELmjbZZLm5E34aFoVYkXdRW",n=1069639,t.next=4,this.api.rpc.chain.getBlockHash(n);case 4:return r=t.sent,"Start Hash [".concat(r,"]"),t.next=8,this.api.query.staking.activeEra.at(r);case 8:return s=t.sent.unwrap().index.toNumber(),"Start Era [".concat(s,"]"),t.t0=Date,t.next=13,this.api.query.timestamp.now.at(r);case 13:return t.t1=t.sent.toNumber(),c=new t.t0(t.t1).toISOString(),"Start Date [".concat(c,"]"),i=1270177,t.next=19,this.api.rpc.chain.getBlockHash(i);case 19:return u=t.sent,"End Hash [".concat(u,"]"),t.next=23,this.api.query.staking.activeEra.at(u);case 23:return l=t.sent.unwrap().index.toNumber(),"End Era [".concat(l,"]"),t.t2=Date,t.next=28,this.api.query.timestamp.now.at(u);case 28:t.t3=t.sent.toNumber(),h=new t.t2(t.t3).toISOString(),"End Date [".concat(h,"]"),d=[],p=o.a.mark((function t(e){var n,s,c,i;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,b.api.rpc.chain.getBlockHash(e);case 2:return n=t.sent,"Block Hash [".concat(r,"]"),t.next=6,b.api.query.staking.activeEra.at(n);case 6:return s=t.sent.unwrap().index.toNumber(),"Block Era [".concat(s,"]"),t.t0=Date,t.next=11,b.api.query.timestamp.now.at(n);case 11:return t.t1=t.sent.toNumber(),c=new t.t0(t.t1).toISOString(),"Block Date [".concat(c,"]"),t.next=16,b.api.query.staking.erasRewardPoints.at(n,s);case 16:i=t.sent,"Era Points [".concat(i,"]"),i.individual.forEach((function(t,e){if("Author Points [".concat(e,"]"),"Individual Points [".concat(t,"]"),e.toString()===a){var n=s;d.indexOf(n)<0&&(d.push(n),"Era [".concat(s,"], Date [").concat(c,"]"))}}));case 19:case"end":return t.stop()}}),t)})),f=n;case 34:if(!(f<i)){t.next=39;break}return t.delegateYield(p(f),"t4",36);case 36:f+=1,t.next=34;break;case 39:return t.abrupt("return",{activeEras:d});case 40:case"end":return t.stop()}}),t,this)})));return function(e){return t.apply(this,arguments)}}()},{key:"getActiveErasForBlock",value:function(){var t=Object(l.a)(o.a.mark((function t(e,a){var n,r,s,c,i,u;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=e||"5EhDdcWm4TdqKp1ew1PqtSpoAELmjbZZLm5E34aFoVYkXdRW",t.next=3,this.api.rpc.chain.getBlockHash(a);case 3:return r=t.sent,t.next=6,this.api.query.staking.activeEra.at(r);case 6:return s=t.sent.unwrap().index.toNumber(),t.t0=Date,t.next=10,this.api.query.timestamp.now.at(r);case 10:return t.t1=t.sent.toNumber(),c=new t.t0(t.t1).toISOString(),t.next=14,this.api.query.staking.erasRewardPoints.at(r,s);case 14:return i=t.sent,u=void 0,i.individual.forEach((function(t,e){if("Author Points [".concat(e,"]"),"Individual Points [".concat(t,"]"),e.toString()===n){var i=Number(t.toBigInt()),o={id:a,era:s,hash:r.toString(),block:a,date:c,points:i};"Era [".concat(o.era,"], Block [").concat(o.block,"], Date [").concat(o.date,"], Points [").concat(o.points,"], Hash [").concat(o.hash,"]"),u=o}})),t.abrupt("return",u);case 18:case"end":return t.stop()}}),t,this)})));return function(e,a){return t.apply(this,arguments)}}()},{key:"findActiveValidators",value:function(){var t=Object(l.a)(o.a.mark((function t(e,a){var n,r,s,c,i,u;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this.api.rpc.chain.getBlock(e);case 2:n=t.sent,r=n.block.header.number.toNumber();case 4:return t.next=6,this.api.rpc.chain.getBlockHash(r);case 6:return c=t.sent,t.next=9,this.api.query.staking.snapshotValidators.at(c);case 9:if((i=t.sent).isEmpty){t.next=15;break}return t.next=13,this.api.query.staking.validatorCount.at(c);case 13:u=t.sent.toNumber(),s=Array.from(i.unwrap()).slice(0,u);case 15:a?--r:++r;case 16:if(void 0===s){t.next=4;break}case 17:return t.abrupt("return",s);case 18:case"end":return t.stop()}}),t,this)})));return function(e,a){return t.apply(this,arguments)}}()},{key:"validatorsData",value:function(){var t=Object(l.a)(o.a.mark((function t(){var e,a,n;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this.api.query.session.validators();case 2:return e=t.sent,t.next=5,this.api.query.staking.currentEra();case 5:if(!(a=t.sent).isSome){t.next=12;break}return t.next=9,this.api.query.staking.erasTotalStake(a.unwrap());case 9:t.t0=t.sent,t.next=13;break;case 12:t.t0=new S.a(0);case 13:return n=t.t0,t.abrupt("return",{count:e.length,validators:e.toJSON(),total_stake:n.toNumber()});case 15:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()}]),t}(),B=a(33);function N(t){return Promise.all(Object.entries(t).map((function(t){var e=Object(m.a)(t,2),a=e[0],n=e[1];return n instanceof Promise?n.then((function(t){return[a,t]})):new Promise((function(t){return t([a,n])}))}))).then((function(t){return t.reduce((function(t,e){var a=Object(m.a)(e,2),n=a[0],r=a[1];return Object(h.a)(Object(h.a)({},t),{},Object(B.a)({},n,r))}),{})}))}var q=new E("wss://rome-rpc-endpoint.joystream.org:9944/");function D(t,e){return H.apply(this,arguments)}function H(){return(H=Object(l.a)(o.a.mark((function t(e,a){var n;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,q.init;case 2:return t.t0=N,t.next=5,q.getActiveErasForBlock(e,a);case 5:return t.t1=t.sent,t.t2={status:t.t1},t.next=9,(0,t.t0)(t.t2);case 9:return n=t.sent,t.abrupt("return",n);case 11:case"end":return t.stop()}}),t)})))).apply(this,arguments)}var P=a(799),A=a(800),C=a(804),I=a(23),L=a(801),R=a(526),F=a(64),T=function(t){Object(b.a)(a,t);var e=Object(k.a)(a);function a(t){var n;return Object(d.a)(this,a),(n=e.call(this,t)).state={shouldStop:!1,rows:[],columns:[{field:"era",headerName:"Era",width:100,sortable:!0,headerAlign:"center"},{field:"block",headerName:"Block",width:100,sortable:!0,headerAlign:"center"},{field:"date",headerName:"Date",width:200,sortable:!0,headerAlign:"center"},{field:"points",headerName:"Points",width:100,sortable:!0,headerAlign:"center"},{field:"hash",headerName:"Block Hash",width:500,sortable:!1,headerAlign:"center"}],stash:"5EhDdcWm4TdqKp1ew1PqtSpoAELmjbZZLm5E34aFoVYkXdRW",startBlock:1069639,endBlock:1270177,isLoading:!1},n.getStatus=n.getStatus.bind(Object(f.a)(n)),n.setStash=n.setStash.bind(Object(f.a)(n)),n.setBlockStart=n.setBlockStart.bind(Object(f.a)(n)),n.setBlockEnd=n.setBlockEnd.bind(Object(f.a)(n)),n}return Object(p.a)(a,[{key:"setStash",value:function(t){this.setState((function(e){return Object(h.a)(Object(h.a)({},e),{},{stash:t.target.value})}))}},{key:"setBlockStart",value:function(t){this.setState((function(e){return Object(h.a)(Object(h.a)({},e),{},{startBlock:t.target.value})}))}},{key:"setBlockEnd",value:function(t){this.setState((function(e){return Object(h.a)(Object(h.a)({},e),{},{endBlock:t.target.value})}))}},{key:"getStatus",value:function(){var t=Object(l.a)(o.a.mark((function t(){var e,a,n,r,s,c,i,l=this;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(e=this.state.stash,a=this.state.startBlock,n=this.state.endBlock,!this.state.isLoading){t.next=7;break}return this.setState((function(t){return Object(h.a)(Object(h.a)({},t),{},{shouldStop:!0,isLoading:!1})})),t.abrupt("return");case 7:if(this.setState((function(t){return Object(h.a)(Object(h.a)({},t),{},{isLoading:!0,rows:[]})})),!(a<n)){t.next=21;break}r=o.a.mark((function t(a){var n;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!l.state.shouldStop){t.next=3;break}return l.setState((function(t){return Object(h.a)(Object(h.a)({},t),{},{shouldStop:!1})})),t.abrupt("return","break");case 3:return t.next=5,D(e,a);case 5:(n=t.sent)&&n.status&&l.state.rows.indexOf(n.status)<0&&l.setState((function(t){return Object(h.a)(Object(h.a)({},t),{},{rows:[].concat(Object(u.a)(l.state.rows),[n.status])})}));case 7:case"end":return t.stop()}}),t)})),s=a;case 11:if(!(s<=n)){t.next=19;break}return t.delegateYield(r(s),"t0",13);case 13:if("break"!==t.t0){t.next=16;break}return t.abrupt("break",19);case 16:s+=1,t.next=11;break;case 19:t.next=31;break;case 21:c=o.a.mark((function t(a){var n;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!l.state.shouldStop){t.next=3;break}return l.setState((function(t){return Object(h.a)(Object(h.a)({},t),{},{shouldStop:!1})})),t.abrupt("return","break");case 3:return t.next=5,D(e,a);case 5:(n=t.sent)&&n.status&&l.state.rows.indexOf(n.status)<0&&l.setState((function(t){return Object(h.a)(Object(h.a)({},t),{},{rows:[].concat(Object(u.a)(l.state.rows),[n.status])})}));case 7:case"end":return t.stop()}}),t)})),i=a;case 23:if(!(i>=n)){t.next=31;break}return t.delegateYield(c(i),"t1",25);case 25:if("break"!==t.t1){t.next=28;break}return t.abrupt("break",31);case 28:i-=1,t.next=23;break;case 31:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"render",value:function(){return Object(F.jsx)("div",{className:"App",children:Object(F.jsx)(P.a,{maxWidth:"lg",children:Object(F.jsxs)(A.a,{container:!0,direction:"column",justify:"center",alignItems:"center",spacing:3,children:[Object(F.jsx)(A.a,{container:!0,item:!0,lg:12}),Object(F.jsx)("img",{src:v,className:"App-logo",alt:"Joystream logo"}),Object(F.jsx)(A.a,{container:!0,item:!0,lg:12,children:Object(F.jsx)(C.a,{onChange:this.setStash,fullWidth:!0,id:"stash",label:"Stash",value:this.state.stash,variant:"filled"})}),Object(F.jsx)(A.a,{container:!0,item:!0,lg:12,children:Object(F.jsx)(C.a,{onChange:this.setBlockStart,fullWidth:!0,id:"block-start",label:"Start Block",value:this.state.startBlock,variant:"filled"})}),Object(F.jsx)(A.a,{container:!0,item:!0,lg:12,children:Object(F.jsx)(C.a,{onChange:this.setBlockEnd,fullWidth:!0,id:"block-end",label:"End Block",value:this.state.endBlock,variant:"filled"})}),Object(F.jsx)(A.a,{container:!0,item:!0,lg:12,children:Object(F.jsx)(W,{fullWidth:!0,onClick:this.getStatus,color:"primary",children:this.state.isLoading?"Stop loading":"Load data"})}),Object(F.jsx)("div",{style:{height:600,width:"98%"},children:Object(F.jsx)(R.a,{rows:this.state.rows,columns:this.state.columns,pageSize:50})})]})})})}}]),a}(n.Component),W=Object(I.a)({root:{boxShadow:"none",textTransform:"none",fontSize:16,padding:"6px 12px",border:"1px solid",lineHeight:1.5,color:"#ffffff",backgroundColor:"#0063cc",borderColor:"#0063cc",fontFamily:["-apple-system","BlinkMacSystemFont",'"Segoe UI"',"Roboto",'"Helvetica Neue"',"Arial","sans-serif",'"Apple Color Emoji"','"Segoe UI Emoji"','"Segoe UI Symbol"'].join(","),"&:hover":{backgroundColor:"#0069d9",borderColor:"#0062cc",boxShadow:"none"},"&:active":{boxShadow:"none",backgroundColor:"#0062cc",borderColor:"#005cbf"},"&:focus":{boxShadow:"0 0 0 0.2rem rgba(0,123,255,.5)"}}})(L.a),Y=function(t){t&&t instanceof Function&&a.e(3).then(a.bind(null,808)).then((function(e){var a=e.getCLS,n=e.getFID,r=e.getFCP,s=e.getLCP,c=e.getTTFB;a(t),n(t),r(t),s(t),c(t)}))};c.a.render(Object(F.jsx)(r.a.StrictMode,{children:Object(F.jsx)(T,{})}),document.getElementById("root")),Y()}},[[740,1,2]]]);
//# sourceMappingURL=main.ada67643.chunk.js.map