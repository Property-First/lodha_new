
const modal=document.getElementById('modal');
const modalTitle=document.getElementById('modalTitle');
 
document.querySelectorAll('.open-modal').forEach(btn=>{
btn.addEventListener('click',()=>{
modalTitle.textContent=btn.dataset.title||'Get Project Details';
modal.classList.add('open');
document.body.style.overflow='hidden';
});
});
document.querySelector('.close').addEventListener('click',()=>{modal.classList.remove('open');document.body.style.overflow=''});
modal.addEventListener('click',e=>{if(e.target===modal){modal.classList.remove('open');document.body.style.overflow=''}});
document.querySelectorAll('.lead-form').forEach(form=>{
form.addEventListener('submit',e=>{
e.preventDefault();
form.querySelector('.success').style.display='block';
});
});
 
document.querySelectorAll('.faq button').forEach(btn=>{
btn.addEventListener('click',()=>{
const faq=btn.closest('.faq');
faq.classList.toggle('open');
btn.querySelector('span').textContent=faq.classList.contains('open')?'−':'+';
});
});
 
const plans={
'2':{title:'2 BHK Grande',desc:'The 2 BHK Grande is a thoughtfully planned residence with well-defined living, dining, bedroom and utility spaces.',area:'845 sq. ft.',config:'2 BHK',price:'₹2.79 Cr*',img:'https://placehold.co/950x680/F8F5EF/121316?text=2+BHK+Grande+Floor+Plan'},
'3p':{title:'3 BHK Premiere',desc:'The 3 BHK Premiere is a spacious residence designed with well-planned bedrooms, living, dining and functional spaces.',area:'1,082 sq. ft.',config:'3 BHK',price:'On Request',img:'https://placehold.co/950x680/F8F5EF/121316?text=3+BHK+Premiere+Floor+Plan'},
'3m':{title:'3 BHK Majesta',desc:'The 3 BHK Majesta is a thoughtfully designed residence offering generous living spaces and a well-balanced home layout.',area:'1,190 sq. ft.',config:'3 BHK',price:'On Request',img:'https://placehold.co/950x680/F8F5EF/121316?text=3+BHK+Majesta+Floor+Plan'},
'3s':{title:'3 BHK Supreme',desc:'The 3 BHK Supreme is a spacious residence offering larger bedrooms, expansive living areas and thoughtfully planned interiors.',area:'1,410 sq. ft.',config:'3 BHK',price:'On Request',img:'https://placehold.co/950x680/F8F5EF/121316?text=3+BHK+Supreme+Floor+Plan'},
'4':{title:'4 BHK Platina',desc:'The 4 BHK Platina is an expansive residence designed for families seeking larger living spaces, greater privacy and a premium home layout.',area:'1,917 sq. ft.',config:'4 BHK',price:'On Request',img:'https://placehold.co/950x680/F8F5EF/121316?text=4+BHK+Platina+Floor+Plan'},
'master':{title:'L&T Ahana Master Plan',desc:'Overall project layout with tower placement, internal circulation, landscaped areas and amenity zones.',area:'Approx. 2 Acres',config:'Master Plan',price:'—',img:'https://placehold.co/950x680/F8F5EF/121316?text=L%26T+Ahana+Master+Plan'}
};
 
document.querySelectorAll('.floor-tab').forEach(tab=>{
tab.addEventListener('click',()=>{
document.querySelectorAll('.floor-tab').forEach(t=>t.classList.remove('active'));
tab.classList.add('active');
const d=plans[tab.dataset.plan];
document.getElementById('planTitle').textContent=d.title;
document.getElementById('planDesc').textContent=d.desc;
document.getElementById('planArea').textContent=d.area;
document.getElementById('planConfig').textContent=d.config;
document.getElementById('planPrice').textContent=d.price;
document.getElementById('planImage').src=d.img;
});
});
 
const lightbox=document.getElementById('lightbox');
document.querySelectorAll('.gitem img').forEach(img=>{
img.addEventListener('click',()=>{
lightbox.querySelector('img').src=img.src;
lightbox.classList.add('open');
});
});
lightbox.querySelector('button').addEventListener('click',()=>lightbox.classList.remove('open'));
lightbox.addEventListener('click',e=>{if(e.target===lightbox)lightbox.classList.remove('open')});
document.addEventListener('keydown',e=>{
if(e.key==='Escape'){modal.classList.remove('open');lightbox.classList.remove('open');document.body.style.overflow=''}
});

document.addEventListener("DOMContentLoaded", function () {

    const hamburger = document.getElementById("hamburger");
    const navlinks = document.getElementById("navlinks");

    hamburger.addEventListener("click", function () {
        hamburger.classList.toggle("active");
        navlinks.classList.toggle("active");
    });

    // Close menu after clicking a navigation link
    document.querySelectorAll("#navlinks a").forEach(function (link) {
        link.addEventListener("click", function () {
            hamburger.classList.remove("active");
            navlinks.classList.remove("active");
        });
    });

});
