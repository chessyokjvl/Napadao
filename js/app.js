// !!! เปลี่ยนเป็น Web App URL ของคุณตรงนี้ !!!
const API_URL = "https://script.google.com/macros/s/AKfycbwUOJgevOgfl_ZtvnjrFx06WASBZfOSU2piMLetUFi_7DvG2dUpxv6L_WBvcgM_htmeKw/exec"; 

// ฟังก์ชันศูนย์กลางเรียก API
async function apiCall(action, method = 'GET', data = null) {
  let url = API_URL;
  let options = { method: method };

  if (method === 'GET') {
    url += `?action=${action}`;
    if (data) {
      for (let key in data) url += `&${key}=${encodeURIComponent(data[key])}`;
    }
  } else {
    // POST ต้องใช้ text/plain เพื่อหลบปัญหา CORS
    options.body = JSON.stringify({ action: action, data: data });
    options.headers = { "Content-Type": "text/plain;charset=utf-8" };
  }

  let response = await fetch(url, options);
  return await response.json();
}

// สร้าง Sidebar อัตโนมัติ (ไม่ต้องก๊อปปี้ไปทุกไฟล์)
function renderLayout(activeMenuId, pageTitle) {
  const sidebarHTML = `
    <div class="sidebar-overlay" onclick="toggleSidebar()"></div>
    <div class="sidebar" id="sidebarMenu">
      <div class="sidebar-header d-flex justify-content-between align-items-center">
        <div><i class="bi bi-buildings"></i> นภาดาวอพาร์ตเมนต์</div>
        <i class="bi bi-x-lg d-lg-none" style="cursor: pointer;" onclick="toggleSidebar()"></i>
      </div>
      <div class="menu-container">
        <a href="index.html" class="${activeMenuId==='menu-dash'?'active':''}"><i class="bi bi-grid-1x2-fill"></i> แดชบอร์ด</a>
        <a href="manage.html" class="${activeMenuId==='menu-manage'?'active':''}"><i class="bi bi-people-fill"></i> จัดการผู้เช่า</a>
        <a href="meter.html?type=water" class="${activeMenuId==='menu-water'?'active':''}"><i class="bi bi-droplet-fill"></i> บันทึกมิเตอร์น้ำ</a>
        <a href="meter.html?type=elec" class="${activeMenuId==='menu-elec'?'active':''}"><i class="bi bi-lightning-charge-fill"></i> บันทึกมิเตอร์ไฟ</a>
        <a href="invoice.html" class="${activeMenuId==='menu-invoice'?'active':''}"><i class="bi bi-receipt"></i> ใบแจ้งยอด</a>
        <a href="summary.html" class="${activeMenuId==='menu-summary'?'active':''}"><i class="bi bi-table"></i> สรุปรายได้</a>
        <a href="maintenance.html" class="${activeMenuId==='menu-maint'?'active':''}"><i class="bi bi-tools"></i> แจ้งซ่อมบำรุง</a>
      </div>
      <a href="#" class="logout-btn"><i class="bi bi-power"></i> ออกจากระบบ</a>
    </div>
  `;

  document.getElementById('layout-sidebar').innerHTML = sidebarHTML;
  document.getElementById('pageTitle').innerText = pageTitle;
  
  let dateEl = document.getElementById('currentDateDisplay');
  if(dateEl) dateEl.innerText = new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'short', day: 'numeric' });
}

function toggleSidebar() {
  document.getElementById('sidebarMenu').classList.toggle('show');
  document.querySelector('.sidebar-overlay').classList.toggle('show');
}
