const state={categories:[
{name:"Mobile Services",desc:"Airtime, data bundles and eSIM",icon:"📱",services:[
{name:"Airtime",desc:"MTN, Airtel, Glo and 9mobile",price:"From ₦100",active:true},
{name:"Data Bundles",desc:"Mobile internet data",price:"From ₦200",active:true},
{name:"eSIM",desc:"eSIM activation and plans",price:"From ₦1,000",active:true}]},
{name:"Social Media Boosting",desc:"Followers, likes and subscribers",icon:"📈",services:[
{name:"Instagram Followers",desc:"Boost Instagram followers",price:"From ₦500",active:true},
{name:"Instagram Likes",desc:"Boost Instagram likes",price:"From ₦300",active:true},
{name:"TikTok Followers",desc:"Boost TikTok followers",price:"From ₦500",active:true}]},
{name:"Virtual Numbers",desc:"International virtual phone numbers",icon:"☎️",services:[
{name:"USA Virtual Number",desc:"USA number",price:"From ₦2,000",active:true},
{name:"UK Virtual Number",desc:"UK number",price:"From ₦2,000",active:true}]},
{name:"Subscriptions",desc:"Entertainment and premium subscriptions",icon:"🎬",services:[
{name:"Netflix",desc:"Netflix subscription",price:"From ₦3,500",active:true},
{name:"Apple Music",desc:"Apple Music subscription",price:"From ₦1,500",active:true}]}
]};

function render(){
 const root=document.getElementById("categoryList");
 root.innerHTML=state.categories.map((c,ci)=>`
 <article class="category">
   <div class="category-head">
    <div class="cat-icon">${c.icon||"💡"}</div>
    <div class="cat-info"><strong>${esc(c.name)}</strong><small>${esc(c.desc)}</small></div>
    <div class="cat-actions">
      <button class="mini" onclick="addService(${ci})">+ Service</button>
      <button class="mini" onclick="editCategory(${ci})">Edit</button>
      <button class="mini" onclick="deleteCategory(${ci})">Delete</button>
    </div>
   </div>
   <div class="service-list">
    ${c.services.length?c.services.map((s,si)=>`
      <div class="service-row">
       <div><strong>${esc(s.name)}</strong><small>${esc(s.desc)}</small></div>
       <span class="price">${esc(s.price)}</span>
       <span class="status ${s.active?'success':'pending'}">${s.active?'Active':'Disabled'}</span>
       <div class="cat-actions">
        <button class="mini" onclick="editService(${ci},${si})">Edit</button>
        <button class="mini" onclick="deleteService(${ci},${si})">Delete</button>
       </div>
      </div>`).join(""):`<div class="empty">No services in this category yet.</div>`}
   </div>
 </article>`).join("");
}
function esc(v){return String(v).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]))}
function modal(title,body,onSave){
 document.getElementById("modalRoot").innerHTML=`<div class="modal-backdrop" id="backdrop"><div class="modal"><h3>${title}</h3><p>These are demo fields for the admin frontend. They will connect to PHP/MySQL later.</p>${body}<div class="modal-actions"><button class="cancel" onclick="closeModal()">Cancel</button><button class="primary" id="saveModal">Save</button></div></div></div>`;
 document.getElementById("saveModal").onclick=onSave;
}
function closeModal(){document.getElementById("modalRoot").innerHTML=""}
function openCategoryModal(index=null){
 const c=index===null?null:state.categories[index];
 modal(index===null?"Create Service Category":"Edit Service Category",`
 <div class="form-group"><label>Category name</label><input id="fName" value="${esc(c?.name||"")}"></div>
 <div class="form-group"><label>Description</label><input id="fDesc" value="${esc(c?.desc||"")}"></div>
 <div class="form-group"><label>Icon</label><input id="fIcon" value="${esc(c?.icon||"💡")}"></div>`,
 ()=>{const v={name:document.getElementById("fName").value.trim(),desc:document.getElementById("fDesc").value.trim(),icon:document.getElementById("fIcon").value.trim()||"💡",services:c?.services||[]};if(!v.name)return alert("Enter a category name.");if(index===null)state.categories.push(v);else state.categories[index]=v;closeModal();render()});
}
function editCategory(i){openCategoryModal(i)}
function deleteCategory(i){if(confirm(`Delete "${state.categories[i].name}" and all its services?`)){state.categories.splice(i,1);render()}}
function addService(ci){serviceModal(ci,null)}
function editService(ci,si){serviceModal(ci,si)}
function serviceModal(ci,si){
 const s=si===null?null:state.categories[ci].services[si];
 modal(si===null?"Create Service":"Edit Service",`
 <div class="form-group"><label>Service name</label><input id="fName" value="${esc(s?.name||"")}"></div>
 <div class="form-group"><label>Description</label><input id="fDesc" value="${esc(s?.desc||"")}"></div>
 <div class="form-group"><label>Customer price</label><input id="fPrice" placeholder="From ₦500" value="${esc(s?.price||"")}"></div>
 <div class="form-group"><label>Status</label><select id="fActive"><option value="1" ${s?.active!==false?"selected":""}>Active</option><option value="0" ${s?.active===false?"selected":""}>Disabled</option></select></div>`,
 ()=>{const v={name:document.getElementById("fName").value.trim(),desc:document.getElementById("fDesc").value.trim(),price:document.getElementById("fPrice").value.trim(),active:document.getElementById("fActive").value==="1"};if(!v.name)return alert("Enter a service name.");if(si===null)state.categories[ci].services.push(v);else state.categories[ci].services[si]=v;closeModal();render()});
}
function deleteService(ci,si){if(confirm(`Delete "${state.categories[ci].services[si].name}"?`)){state.categories[ci].services.splice(si,1);render()}}
render();
