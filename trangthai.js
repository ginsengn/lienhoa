/**
 * trangthai.js
 * Phân tích trạng thái Vượng – Tướng – Hưu – Tù – Tử (Suy Nhược)
 * của từng quái đơn trong Liên Hoa Độn theo Tiết Khí (Tháng) & Năm.
 *
 * Yêu cầu:
 *  - calendar-core.js đã được nạp (hàm NL_getDayContext)
 *  - lunar_date_vi CDN đã được nạp
 *  - Trang Liên Hoa Độn đã có results (mảng Không Thời)
 *
 * Cách dùng: đặt file cùng thư mục, thêm:
 *   <script src="trangthai.js" defer></script>
 */

(function () {
  "use strict";

  // ============================================================
  // 1. DỮ LIỆU NỀ
  // ============================================================

  /** Quái đơn → Hành */
  const QUAI_HANH = {
    1: "Kim", // Càn
    2: "Kim", // Đoài
    3: "Hỏa", // Ly
    4: "Mộc", // Chấn
    5: "Mộc", // Tốn
    6: "Thủy", // Khảm
    7: "Thổ", // Cấn
    8: "Thổ"  // Khôn
  };

  const QUE_TEN = ["", "Càn", "Đoài", "Ly", "Chấn", "Tốn", "Khảm", "Cấn", "Khôn"];

  /**
   * Trạng thái Ngũ Hành theo Mùa / Tiết Khí (Chi tháng)
   * Key = Chi tháng (Dần, Mão, …)
   * Value = { Hành: "Vượng|Tướng|Hưu|Tù|Tử" }
   */
  const TRANG_THAI_THEO_CHI = {
    // Mùa Xuân – Dần, Mão
    "Dần": { "Mộc": "Vượng", "Hỏa": "Tướng", "Thủy": "Hưu", "Kim": "Tù", "Thổ": "Tử" },
    "Mão": { "Mộc": "Vượng", "Hỏa": "Tướng", "Thủy": "Hưu", "Kim": "Tù", "Thổ": "Tử" },

    // Mùa Hạ – Tỵ, Ngọ
    "Tỵ":  { "Mộc": "Hưu", "Hỏa": "Vượng", "Thổ": "Tướng", "Thủy": "Tù", "Kim": "Tử" },
    "Ngọ": { "Mộc": "Hưu", "Hỏa": "Vượng", "Thổ": "Tướng", "Thủy": "Tù", "Kim": "Tử" },

    // Mùa Thu – Thân, Dậu
    "Thân": { "Thổ": "Hưu", "Kim": "Vượng", "Thủy": "Tướng", "Hỏa": "Tù", "Mộc": "Tử" },
    "Dậu":  { "Thổ": "Hưu", "Kim": "Vượng", "Thủy": "Tướng", "Hỏa": "Tù", "Mộc": "Tử" },

    // Mùa Đông – Hợi, Tý
    "Hợi": { "Kim": "Hưu", "Thủy": "Vượng", "Mộc": "Tướng", "Thổ": "Tù", "Hỏa": "Tử" },
    "Tý":  { "Kim": "Hưu", "Thủy": "Vượng", "Mộc": "Tướng", "Thổ": "Tù", "Hỏa": "Tử" },

    // Tứ Quý (Thổ) – Thìn, Mùi, Tuất, Sửu
    "Thìn": { "Thổ": "Vượng", "Kim": "Tướng", "Thủy": "Tử", "Mộc": "Tù", "Hỏa": "Hưu" },
    "Mùi":  { "Thổ": "Vượng", "Kim": "Tướng", "Thủy": "Tử", "Mộc": "Tù", "Hỏa": "Hưu" },
    "Tuất": { "Thổ": "Vượng", "Kim": "Tướng", "Thủy": "Tử", "Mộc": "Tù", "Hỏa": "Hưu" },
    "Sửu":  { "Thổ": "Vượng", "Kim": "Tướng", "Thủy": "Tử", "Mộc": "Tù", "Hỏa": "Hưu" }
  };

  /** Màu hiển thị theo trạng thái */
  const MAU_TRANG_THAI = {
    "Vượng": "#6dbf6d",   // Xanh lá
    "Tướng": "#5b9bd5",   // Xanh da trời
    "Hưu":   "#c9a2e0",   // Tím
    "Tù":    "#e0c060",   // Vàng nhạt
    "Tử":    "#e07070"    // Đỏ (Suy Tuyệt / Suy Nhược)
  };

  /** Nhãn đầy đủ */
  const NHAN_TRANG_THAI = {
    "Vượng": "Vượng",
    "Tướng": "Tướng",
    "Hưu":   "Hưu",
    "Tù":    "Tù",
    "Tử":    "Suy Tuyệt (Tử)"
  };

  /** Nhóm mùa theo Chi */
  const MUA_THEO_CHI = {
    "Dần": "Xuân", "Mão": "Xuân",
    "Tỵ": "Hạ", "Ngọ": "Hạ",
    "Thân": "Thu", "Dậu": "Thu",
    "Hợi": "Đông", "Tý": "Đông",
    "Thìn": "Tứ Quý (Thổ)", "Mùi": "Tứ Quý (Thổ)",
    "Tuất": "Tứ Quý (Thổ)", "Sửu": "Tứ Quý (Thổ)"
  };

  // ============================================================
  // 2. HÀM TIỆN ÍCH
  // ============================================================

  function extractChi(canChiStr) {
    if (!canChiStr) return "";
    const s = String(canChiStr).trim();
    const parts = s.split(/\s+/);
    const last = parts[parts.length - 1];
    const list = ["Tý","Sửu","Dần","Mão","Thìn","Tỵ","Ngọ","Mùi","Thân","Dậu","Tuất","Hợi"];
    if (list.includes(last)) return last;
    // fallback không dấu
    const map = {
      Ty:"Tý", Suu:"Sửu", Dan:"Dần", Mao:"Mão", Thin:"Thìn",
      Ngo:"Ngọ", Mui:"Mùi", Than:"Thân", Dau:"Dậu", Tuat:"Tuất", Hoi:"Hợi"
    };
    return map[last] || last;
  }

  function getTrangThai(hanh, chi) {
    const bang = TRANG_THAI_THEO_CHI[chi];
    if (!bang) return null;
    return bang[hanh] || null;
  }

  function getTrangThaiQuai(quaiNum, chi) {
    const hanh = QUAI_HANH[quaiNum];
    if (!hanh) return null;
    return getTrangThai(hanh, chi);
  }

  function mauCua(tt) {
    return MAU_TRANG_THAI[tt] || "#aaa";
  }

  function nhanCua(tt) {
    return NHAN_TRANG_THAI[tt] || tt || "?";
  }

  // ============================================================
  // 3. UI – FORM NHẬP THỜI GIAN + KHUNG PHÂN TÍCH
  // ============================================================

  function injectStyles() {
    if (document.getElementById("tt-styles")) return;
    const css = `
      #tt-panel {
        background: var(--paper, #1a1410);
        border: 1px solid var(--border, #5c3d1e);
        border-radius: 8px;
        padding: 18px;
        margin: 24px 0;
      }
      #tt-panel h3 {
        font-family: 'Cinzel Decorative', serif;
        font-size: 0.95rem;
        color: var(--gold-light, #e8b84b);
        margin-bottom: 14px;
      }
      .tt-row {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
        margin-bottom: 12px;
        align-items: flex-end;
      }
      .tt-group {
        display: flex;
        flex-direction: column;
        gap: 4px;
        min-width: 90px;
      }
      .tt-group label {
        font-size: 0.72rem;
        color: var(--gold, #c9922a);
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }
      .tt-group input, .tt-group select {
        background: rgba(0,0,0,0.4);
        border: 1px solid var(--border, #5c3d1e);
        border-radius: 4px;
        color: var(--text, #e8d9c0);
        font-family: 'Noto Serif', serif;
        font-size: 0.9rem;
        padding: 7px 10px;
        outline: none;
      }
      .tt-group input:focus, .tt-group select:focus {
        border-color: var(--gold, #c9922a);
      }
      .tt-btn {
        padding: 8px 18px;
        border: 1px solid var(--gold, #c9922a);
        border-radius: 4px;
        background: rgba(201,146,42,0.12);
        color: var(--gold-light, #e8b84b);
        font-family: 'Noto Serif', serif;
        font-size: 0.85rem;
        cursor: pointer;
      }
      .tt-btn:hover { background: rgba(201,146,42,0.22); }
      .tt-info {
        font-size: 0.78rem;
        color: var(--text-dim, #8a7a65);
        margin-bottom: 14px;
        line-height: 1.6;
      }
      .tt-info b { color: var(--gold-light, #e8b84b); }

      .tt-kt-block {
        border: 1px solid rgba(92,61,30,0.5);
        border-radius: 6px;
        margin-bottom: 10px;
        overflow: hidden;
      }
      .tt-kt-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 8px 12px;
        background: rgba(201,146,42,0.08);
        cursor: pointer;
        user-select: none;
      }
      .tt-kt-header:hover { background: rgba(201,146,42,0.14); }
      .tt-kt-title {
        font-size: 0.8rem;
        color: var(--gold-light, #e8b84b);
        font-weight: bold;
      }
      .tt-kt-toggle {
        font-size: 0.7rem;
        color: var(--text-dim, #8a7a65);
      }
      .tt-kt-body {
        padding: 10px 12px 12px;
        display: none;
      }
      .tt-kt-body.open { display: block; }

      .tt-que-row {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-bottom: 8px;
      }
      .tt-que-label {
        font-size: 0.7rem;
        color: var(--text-dim, #8a7a65);
        min-width: 52px;
        padding-top: 4px;
      }
      .tt-badge {
        display: inline-flex;
        align-items: center;
        gap: 5px;
        padding: 3px 9px;
        border-radius: 12px;
        font-size: 0.72rem;
        border: 1px solid;
        white-space: nowrap;
      }
      .tt-badge .tt-name { font-weight: bold; }
      .tt-badge .tt-tt { opacity: 0.95; }

      .tt-note {
        font-size: 0.7rem;
        color: var(--text-dim, #8a7a65);
        margin-top: 6px;
        line-height: 1.55;
        border-left: 2px solid rgba(201,146,42,0.35);
        padding-left: 8px;
      }

      .tt-menu-box {
        background: rgba(0,0,0,0.25);
        border: 1px solid rgba(92,61,30,0.45);
        border-radius: 6px;
        padding: 12px;
        margin-top: 16px;
      }
      .tt-menu-box h4 {
        font-size: 0.78rem;
        color: var(--gold, #c9922a);
        margin-bottom: 10px;
        letter-spacing: 0.06em;
        text-transform: uppercase;
      }
      .tt-check-row {
        display: flex;
        gap: 16px;
        margin: 8px 0 10px;
        font-size: 0.8rem;
      }
      .tt-check-row label {
        display: flex;
        align-items: center;
        gap: 5px;
        cursor: pointer;
        color: var(--text, #e8d9c0);
      }
      .tt-out {
        font-size: 0.78rem;
        line-height: 1.7;
        color: var(--text, #e8d9c0);
        margin-top: 8px;
        white-space: pre-wrap;
      }
      .tt-legend {
        display: flex;
        flex-wrap: wrap;
        gap: 8px 14px;
        margin: 10px 0 14px;
        font-size: 0.7rem;
      }
      .tt-legend span {
        display: inline-flex;
        align-items: center;
        gap: 4px;
      }
      .tt-dot {
        width: 10px; height: 10px;
        border-radius: 50%;
        display: inline-block;
      }
    `;
    const style = document.createElement("style");
    style.id = "tt-styles";
    style.textContent = css;
    document.head.appendChild(style);
  }

  function createPanel() {
    if (document.getElementById("tt-panel")) return;

    const panel = document.createElement("div");
    panel.id = "tt-panel";
    panel.innerHTML = `
      <h3>☯ Trạng Thái Quái Đơn theo Tiết Khí</h3>

      <div class="tt-row">
        <div class="tt-group">
          <label>Ngày</label>
          <input type="number" id="ttNgay" min="1" max="31" placeholder="dd">
        </div>
        <div class="tt-group">
          <label>Tháng</label>
          <input type="number" id="ttThang" min="1" max="12" placeholder="mm">
        </div>
        <div class="tt-group">
          <label>Năm</label>
          <input type="number" id="ttNam" min="1900" max="2100" placeholder="yyyy">
        </div>
        <div class="tt-group">
          <label>Giờ (Chi)</label>
          <select id="ttGio">
            <option value="">-- Giờ --</option>
            <option value="Tý">Tý (23-1h)</option>
            <option value="Sửu">Sửu (1-3h)</option>
            <option value="Dần">Dần (3-5h)</option>
            <option value="Mão">Mão (5-7h)</option>
            <option value="Thìn">Thìn (7-9h)</option>
            <option value="Tỵ">Tỵ (9-11h)</option>
            <option value="Ngọ">Ngọ (11-13h)</option>
            <option value="Mùi">Mùi (13-15h)</option>
            <option value="Thân">Thân (15-17h)</option>
            <option value="Dậu">Dậu (17-19h)</option>
            <option value="Tuất">Tuất (19-21h)</option>
            <option value="Hợi">Hợi (21-23h)</option>
          </select>
        </div>
        <button class="tt-btn" id="ttBtnTinh">📅 Lấy Can Chi & Phân Tích</button>
      </div>

      <div class="tt-info" id="ttCanChiInfo">
        Nhập Dương lịch → bấm nút để lấy Can Chi từ calendar-core.js, sau đó phân tích trạng thái từng quái đơn theo Tháng (mặc định) và Năm.
      </div>

      <div class="tt-legend">
        <span><i class="tt-dot" style="background:#6dbf6d"></i> Vượng</span>
        <span><i class="tt-dot" style="background:#5b9bd5"></i> Tướng</span>
        <span><i class="tt-dot" style="background:#c9a2e0"></i> Hưu</span>
        <span><i class="tt-dot" style="background:#e0c060"></i> Tù</span>
        <span><i class="tt-dot" style="background:#e07070"></i> Suy Tuyệt (Tử)</span>
      </div>

      <div id="ttKetQua"></div>

      <!-- Menu 1: Xem trạng thái 1 quái đơn -->
      <div class="tt-menu-box">
        <h4>Menu 1 · Xem trạng thái 1 quái đơn</h4>
        <div class="tt-row">
          <div class="tt-group" style="min-width:160px">
            <label>Chọn quái đơn</label>
            <select id="ttSelectQuai1">
              <option value="">— Chọn —</option>
            </select>
          </div>
          <button class="tt-btn" id="ttBtnXem1">Xem</button>
        </div>
        <div class="tt-out" id="ttOut1"></div>
      </div>

      <!-- Menu 2: Cát Thần / Kỵ Thần -->
      <div class="tt-menu-box">
        <h4>Menu 2 · Cát Thần / Kỵ Thần</h4>
        <div class="tt-row">
          <div class="tt-group" style="min-width:160px">
            <label>Chọn quái đơn</label>
            <select id="ttSelectQuai2">
              <option value="">— Chọn —</option>
            </select>
          </div>
        </div>
        <div class="tt-check-row">
          <label><input type="checkbox" id="ttCatThan"> Cát Thần</label>
          <label><input type="checkbox" id="ttKyThan"> Kỵ Thần</label>
        </div>
        <button class="tt-btn" id="ttBtnXem2">Đề xuất thời điểm</button>
        <div class="tt-out" id="ttOut2"></div>
      </div>
    `;

    // Chèn vào cuối .container hoặc body
    const container = document.querySelector(".container") || document.body;
    container.appendChild(panel);

    // Events
    document.getElementById("ttBtnTinh").addEventListener("click", onTinhCanChi);
    document.getElementById("ttBtnXem1").addEventListener("click", onXemQuai1);
    document.getElementById("ttBtnXem2").addEventListener("click", onXemCatKy);

    // Checkbox exclusive-ish (có thể bỏ chọn cả hai)
    document.getElementById("ttCatThan").addEventListener("change", function () {
      if (this.checked) document.getElementById("ttKyThan").checked = false;
    });
    document.getElementById("ttKyThan").addEventListener("change", function () {
      if (this.checked) document.getElementById("ttCatThan").checked = false;
    });
  }

  // ============================================================
  // 4. LẤY CAN CHI TỪ CALENDAR-CORE
  // ============================================================

  let lastCtx = null; // lưu context gần nhất

  function onTinhCanChi() {
    const ngay  = parseInt(document.getElementById("ttNgay").value, 10);
    const thang = parseInt(document.getElementById("ttThang").value, 10);
    const nam   = parseInt(document.getElementById("ttNam").value, 10);
    const gio   = document.getElementById("ttGio").value;

    if (!ngay || !thang || !nam) {
      alert("Vui lòng nhập đủ Ngày / Tháng / Năm Dương lịch.");
      return;
    }
    if (typeof NL_getDayContext !== "function") {
      alert("Chưa nạp được calendar-core.js. Kiểm tra thẻ <script src=\"calendar-core.js\">.");
      return;
    }

    let ctx;
    try {
      ctx = NL_getDayContext(nam, thang, ngay, gio || "Ngọ");
    } catch (e) {
      alert("Lỗi khi gọi calendar-core: " + e.message);
      return;
    }

    if (!ctx || !ctx.socVong || !ctx.socVong.canChiNgay) {
      alert("Không lấy được Can Chi ngày. Kiểm tra lại ngày tháng năm.");
      return;
    }

    lastCtx = ctx;

    const chiNgay  = extractChi(ctx.socVong.canChiNgay);
    const chiThang = (ctx.tietKhi && ctx.tietKhi.canChiThang)
      ? extractChi(ctx.tietKhi.canChiThang)
      : "";
    const chiNam   = (ctx.tietKhi && ctx.tietKhi.canChiNam)
      ? extractChi(ctx.tietKhi.canChiNam)
      : "";

    const infoEl = document.getElementById("ttCanChiInfo");
    let infoHtml = `<b>Ngày:</b> ${ctx.socVong.canChiNgay}`;
    if (ctx.tietKhi && ctx.tietKhi.canChiThang) {
      infoHtml += ` &nbsp;|&nbsp; <b>Tháng (Tiết Khí):</b> ${ctx.tietKhi.canChiThang}`;
      if (chiThang) infoHtml += ` → Mùa <b>${MUA_THEO_CHI[chiThang] || "?"}</b>`;
    }
    if (ctx.tietKhi && ctx.tietKhi.canChiNam) {
      infoHtml += ` &nbsp;|&nbsp; <b>Năm:</b> ${ctx.tietKhi.canChiNam}`;
    }
    if (ctx.gio && ctx.gio.canChi) {
      infoHtml += ` &nbsp;|&nbsp; <b>Giờ:</b> ${ctx.gio.canChi}`;
    }
    infoHtml += `<br><span style="opacity:0.85">Trạng thái <b>Mặc định</b> = theo Tháng Tiết Khí (giai đoạn, chu kỳ cố định). Trạng thái <b>Tổng thể</b> = theo Năm (năng lượng chung cả năm).</span>`;
    infoEl.innerHTML = infoHtml;

    // Phân tích toàn bộ Không Thời đang có trên trang
    phanTichTatCa(chiThang, chiNam);
  }

  // ============================================================
  // 5. PHÂN TÍCH TOÀN BỘ KHÔNG THỜI
  // ============================================================

  /** Lấy mảng results từ khu vực đang active hoặc cả hai tab */
  function getAllResults() {
    const list = [];
    // result1 / result2 do trang Liên Hoa Độn gán _results
    ["result1", "result2"].forEach(id => {
      const el = document.getElementById(id);
      if (el && el._results && el._results.length) {
        list.push({ cid: id, results: el._results, taQuai: el._taQuai });
      }
    });
    return list;
  }

  /** Thu thập tất cả quái đơn xuất hiện */
  function collectQuaiSet(results) {
    const set = new Set();
    results.forEach(q => {
      [q.thuong, q.ha, q.hoThuong, q.hoHa, q.bienThuong, q.bienHa].forEach(n => {
        if (n) set.add(n);
      });
    });
    return set;
  }

  function badgeHTML(quaiNum, tt) {
    const ten = QUE_TEN[quaiNum] || "?";
    const hanh = QUAI_HANH[quaiNum] || "";
    const color = mauCua(tt);
    const label = nhanCua(tt);
    return `<span class="tt-badge" style="color:${color};border-color:${color};background:${color}18">
      <span class="tt-name">${ten}</span>
      <span style="opacity:0.7">(${hanh})</span>
      <span class="tt-tt">· ${label}</span>
    </span>`;
  }

  function phanTichTatCa(chiThang, chiNam) {
    const boxes = getAllResults();
    const ketQuaEl = document.getElementById("ttKetQua");
    ketQuaEl.innerHTML = "";

    if (!boxes.length) {
      ketQuaEl.innerHTML = `<p style="font-size:0.8rem;color:var(--text-dim)">Chưa có quẻ Liên Hoa nào được lập. Hãy bấm «Lập Quẻ» ở tab phía trên trước.</p>`;
      return;
    }

    if (!chiThang) {
      ketQuaEl.innerHTML = `<p style="font-size:0.8rem;color:#e07070">Không lấy được Chi Tháng (Tiết Khí). Có thể nằm ngoài phạm vi dữ liệu calendar-core (thường 2023–2046).</p>`;
      return;
    }

    const allQuai = new Set();

    boxes.forEach(({ cid, results }) => {
      const section = document.createElement("div");
      section.style.marginBottom = "18px";

      const title = document.createElement("div");
      title.style.cssText = "font-size:0.82rem;color:var(--gold-light);margin-bottom:8px;font-weight:bold";
      title.textContent = cid === "result1" ? "Tab 1 · Thượng + Hạ" : "Tab 2 · Thượng + Hạ + Hào Động";
      section.appendChild(title);

      results.forEach((q, idx) => {
        const ktNum = idx + 1;
        const isChinh = idx === 0;

        // Thu thập quái
        [q.thuong, q.ha, q.hoThuong, q.hoHa, q.bienThuong, q.bienHa].forEach(n => allQuai.add(n));

        const block = document.createElement("div");
        block.className = "tt-kt-block";

        const header = document.createElement("div");
        header.className = "tt-kt-header";
        header.innerHTML = `
          <span class="tt-kt-title">${isChinh ? "Quẻ Chính" : "Không Thời " + ktNum}</span>
          <span class="tt-kt-toggle">▼ Mở / Thu gọn</span>
        `;

        const body = document.createElement("div");
        body.className = "tt-kt-body";
        // Mặc định mở Quẻ Chính, các KT khác thu gọn
        if (isChinh) body.classList.add("open");

        header.addEventListener("click", () => {
          body.classList.toggle("open");
        });

        // --- Tháng (Mặc định) ---
        let html = `<div style="font-size:0.72rem;color:var(--gold);margin-bottom:6px">★ Mặc định · Tháng ${chiThang} (${MUA_THEO_CHI[chiThang] || ""})</div>`;

        html += `<div class="tt-que-row">
          <span class="tt-que-label">Chính</span>
          ${badgeHTML(q.thuong, getTrangThaiQuai(q.thuong, chiThang))}
          ${badgeHTML(q.ha, getTrangThaiQuai(q.ha, chiThang))}
        </div>`;
        html += `<div class="tt-que-row">
          <span class="tt-que-label">Hỗ</span>
          ${badgeHTML(q.hoThuong, getTrangThaiQuai(q.hoThuong, chiThang))}
          ${badgeHTML(q.hoHa, getTrangThaiQuai(q.hoHa, chiThang))}
        </div>`;
        html += `<div class="tt-que-row">
          <span class="tt-que-label">Biến</span>
          ${badgeHTML(q.bienThuong, getTrangThaiQuai(q.bienThuong, chiThang))}
          ${badgeHTML(q.bienHa, getTrangThaiQuai(q.bienHa, chiThang))}
        </div>`;

        html += `<div class="tt-note">Trạng thái theo Tháng Tiết Khí là <b>năng lượng giai đoạn</b>, chu kỳ cố định theo mùa.</div>`;

        // --- Năm (Tổng thể) ---
        if (chiNam) {
          html += `<div style="font-size:0.72rem;color:var(--gold);margin:12px 0 6px">☆ Tổng thể · Năm ${chiNam}</div>`;
          html += `<div class="tt-que-row">
            <span class="tt-que-label">Chính</span>
            ${badgeHTML(q.thuong, getTrangThaiQuai(q.thuong, chiNam))}
            ${badgeHTML(q.ha, getTrangThaiQuai(q.ha, chiNam))}
          </div>`;
          html += `<div class="tt-que-row">
            <span class="tt-que-label">Hỗ</span>
            ${badgeHTML(q.hoThuong, getTrangThaiQuai(q.hoThuong, chiNam))}
            ${badgeHTML(q.hoHa, getTrangThaiQuai(q.hoHa, chiNam))}
          </div>`;
          html += `<div class="tt-que-row">
            <span class="tt-que-label">Biến</span>
            ${badgeHTML(q.bienThuong, getTrangThaiQuai(q.bienThuong, chiNam))}
            ${badgeHTML(q.bienHa, getTrangThaiQuai(q.bienHa, chiNam))}
          </div>`;
          html += `<div class="tt-note">Trạng thái theo Năm là <b>năng lượng tổng thể</b> của cả năm, tình trạng chung.</div>`;
        }

        body.innerHTML = html;
        block.appendChild(header);
        block.appendChild(body);
        section.appendChild(block);
      });

      ketQuaEl.appendChild(section);
    });

    // Cập nhật 2 select menu
    fillSelects(allQuai);
  }

  function fillSelects(quaiSet) {
    const opts = ['<option value="">— Chọn —</option>'];
    [...quaiSet].sort((a, b) => a - b).forEach(n => {
      const ten = QUE_TEN[n] || "?";
      const hanh = QUAI_HANH[n] || "";
      opts.push(`<option value="${n}">${ten} (${hanh})</option>`);
    });
    // Thêm đủ 8 quái nếu set rỗng (chưa lập quẻ)
    if (quaiSet.size === 0) {
      for (let i = 1; i <= 8; i++) {
        opts.push(`<option value="${i}">${QUE_TEN[i]} (${QUAI_HANH[i]})</option>`);
      }
    }
    const html = opts.join("");
    document.getElementById("ttSelectQuai1").innerHTML = html;
    document.getElementById("ttSelectQuai2").innerHTML = html;
  }

  // ============================================================
  // 6. MENU 1 – XEM 1 QUÁI ĐƠN
  // ============================================================

  function onXemQuai1() {
    const val = document.getElementById("ttSelectQuai1").value;
    const out = document.getElementById("ttOut1");
    if (!val) {
      out.textContent = "Vui lòng chọn quái đơn.";
      return;
    }
    if (!lastCtx) {
      out.textContent = "Vui lòng nhập Dương lịch và bấm «Lấy Can Chi & Phân Tích» trước.";
      return;
    }

    const quai = parseInt(val, 10);
    const ten = QUE_TEN[quai];
    const hanh = QUAI_HANH[quai];
    const chiThang = extractChi(lastCtx.tietKhi && lastCtx.tietKhi.canChiThang);
    const chiNam   = extractChi(lastCtx.tietKhi && lastCtx.tietKhi.canChiNam);

    const ttThang = chiThang ? getTrangThai(hanh, chiThang) : null;
    const ttNam   = chiNam   ? getTrangThai(hanh, chiNam)   : null;

    let text = `Quái đơn: ${ten} (${hanh})\n\n`;
    if (ttThang) {
      text += `★ Mặc định (Tháng ${chiThang} – ${MUA_THEO_CHI[chiThang] || ""}):\n`;
      text += `   → ${nhanCua(ttThang)}\n`;
      text += `   (Năng lượng giai đoạn, chu kỳ cố định theo mùa)\n\n`;
    }
    if (ttNam) {
      text += `☆ Tổng thể (Năm ${chiNam}):\n`;
      text += `   → ${nhanCua(ttNam)}\n`;
      text += `   (Năng lượng chung cả năm)\n`;
    }
    out.textContent = text;
  }

  // ============================================================
  // 7. MENU 2 – CÁT THẦN / KỴ THẦN
  // ============================================================

  /** Tất cả Chi tháng theo nhóm */
  const ALL_CHI_THANG = [
    { chi: "Dần", mua: "Xuân" },
    { chi: "Mão", mua: "Xuân" },
    { chi: "Tỵ",  mua: "Hạ" },
    { chi: "Ngọ", mua: "Hạ" },
    { chi: "Thân", mua: "Thu" },
    { chi: "Dậu",  mua: "Thu" },
    { chi: "Hợi", mua: "Đông" },
    { chi: "Tý",  mua: "Đông" },
    { chi: "Thìn", mua: "Tứ Quý" },
    { chi: "Mùi",  mua: "Tứ Quý" },
    { chi: "Tuất", mua: "Tứ Quý" },
    { chi: "Sửu",  mua: "Tứ Quý" }
  ];

  function onXemCatKy() {
    const val = document.getElementById("ttSelectQuai2").value;
    const isCat = document.getElementById("ttCatThan").checked;
    const isKy  = document.getElementById("ttKyThan").checked;
    const out = document.getElementById("ttOut2");

    if (!val) {
      out.textContent = "Vui lòng chọn quái đơn.";
      return;
    }
    if (!isCat && !isKy) {
      out.textContent = "Vui lòng tích Cát Thần hoặc Kỵ Thần.";
      return;
    }

    const quai = parseInt(val, 10);
    const ten = QUE_TEN[quai];
    const hanh = QUAI_HANH[quai];

    const thuanLoi = []; // Vượng, Tướng
    const batLoi   = []; // Hưu, Tù, Tử

    ALL_CHI_THANG.forEach(({ chi, mua }) => {
      const tt = getTrangThai(hanh, chi);
      const item = `${chi} (${mua}) → ${nhanCua(tt)}`;
      if (tt === "Vượng" || tt === "Tướng") thuanLoi.push(item);
      else batLoi.push(item);
    });

    let text = `Quái đơn: ${ten} (${hanh})\n\n`;

    if (isCat) {
      text += `=== CÁT THẦN ===\n`;
      text += `Thuận lợi (Vượng / Tướng) — nên hành động:\n`;
      thuanLoi.forEach(s => { text += `  ✓ ${s}\n`; });
      text += `\nBất lợi (Hưu / Tù / Suy Tuyệt) — nên tránh:\n`;
      batLoi.forEach(s => { text += `  ✗ ${s}\n`; });
    }

    if (isKy) {
      text += `=== KỴ THẦN ===\n`;
      text += `Mạnh (Vượng / Tướng) — cản trở / gây hại → tránh hành động:\n`;
      thuanLoi.forEach(s => { text += `  ⚠ ${s}\n`; });
      text += `\nSuy nhược (Hưu / Tù / Suy Tuyệt) — tranh thủ hành động:\n`;
      batLoi.forEach(s => { text += `  ✓ ${s}\n`; });
    }

    out.textContent = text;
  }

  // ============================================================
  // 8. KHỞI TẠO
  // ============================================================

  function init() {
    injectStyles();
    createPanel();
    // Fill select mặc định đủ 8 quái
    fillSelects(new Set([1, 2, 3, 4, 5, 6, 7, 8]));
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  // Expose nhẹ nếu cần gọi từ ngoài
  window.TrangThaiQuai = {
    getTrangThaiQuai,
    getTrangThai,
    extractChi,
    QUAI_HANH,
    TRANG_THAI_THEO_CHI
  };
})();
