// =========================================================
//  CALENDAR CORE — Lịch Âm Dương & Tiết Khí
//  (Logic gốc giữ nguyên 100%, chỉ tách file + bổ sung các hàm
//   NL_* ở cuối để làm "cầu nối" dữ liệu cho lớp Ngũ Linh Engine)
// =========================================================

// =========================================================
//  TIẾT KHÍ DATA — giờ Việt Nam (ICT, UTC+7)
//  Phạm vi: 1950–2050 (dữ liệu chính xác từ bảng Excel gốc)
//  Format: { năm: { tháng: [ {name, day, time}, {name, day, time} ] } }
// =========================================================
const solarTermsDB = {
    1950: {
        1:  [{ name:"Tiểu Hàn", day:6, time:"04:38" }, { name:"Đại Hàn", day:20, time:"21:59" }],
        2:  [{ name:"Lập Xuân", day:4, time:"16:20" }, { name:"Vũ Thủy", day:19, time:"12:17" }],
        3:  [{ name:"Kinh Trập", day:6, time:"10:35" }, { name:"Xuân Phân", day:21, time:"11:34" }],
        4:  [{ name:"Thanh Minh", day:5, time:"15:44" }, { name:"Cốc Vũ", day:20, time:"22:58" }],
        5:  [{ name:"Lập Hạ", day:6, time:"09:24" }, { name:"Tiểu Mãn", day:21, time:"22:26" }],
        6:  [{ name:"Mang Chủng", day:6, time:"13:50" }, { name:"Hạ Chí", day:22, time:"06:35" }],
        7:  [{ name:"Tiểu Thử", day:8, time:"00:13" }, { name:"Đại Thử", day:23, time:"17:29" }],
        8:  [{ name:"Lập Thu", day:8, time:"09:55" }, { name:"Xử Thử", day:24, time:"00:23" }],
        9:  [{ name:"Bạch Lộ", day:8, time:"12:33" }, { name:"Thu Phân", day:23, time:"21:43" }],
        10:  [{ name:"Hàn Lộ", day:9, time:"03:51" }, { name:"Sương Giáng", day:24, time:"06:44" }],
        11:  [{ name:"Lập Đông", day:8, time:"06:43" }, { name:"Tiểu Tuyết", day:23, time:"04:02" }],
        12:  [{ name:"Đại Tuyết", day:7, time:"23:21" }, { name:"Đông Chí", day:22, time:"17:12" }]
    },
    1951: {
        1:  [{ name:"Tiểu Hàn", day:6, time:"10:29" }, { name:"Đại Hàn", day:21, time:"03:51" }],
        2:  [{ name:"Lập Xuân", day:4, time:"22:13" }, { name:"Vũ Thủy", day:19, time:"18:09" }],
        3:  [{ name:"Kinh Trập", day:6, time:"16:26" }, { name:"Xuân Phân", day:21, time:"17:25" }],
        4:  [{ name:"Thanh Minh", day:5, time:"21:32" }, { name:"Cốc Vũ", day:21, time:"04:48" }],
        5:  [{ name:"Lập Hạ", day:6, time:"15:09" }, { name:"Tiểu Mãn", day:22, time:"04:15" }],
        6:  [{ name:"Mang Chủng", day:6, time:"19:32" }, { name:"Hạ Chí", day:22, time:"12:24" }],
        7:  [{ name:"Tiểu Thử", day:8, time:"05:53" }, { name:"Đại Thử", day:23, time:"23:20" }],
        8:  [{ name:"Lập Thu", day:8, time:"15:37" }, { name:"Xử Thử", day:24, time:"06:15" }],
        9:  [{ name:"Bạch Lộ", day:8, time:"18:17" }, { name:"Thu Phân", day:24, time:"03:36" }],
        10:  [{ name:"Hàn Lộ", day:9, time:"09:36" }, { name:"Sương Giáng", day:24, time:"12:36" }],
        11:  [{ name:"Lập Đông", day:8, time:"12:26" }, { name:"Tiểu Tuyết", day:23, time:"09:51" }],
        12:  [{ name:"Đại Tuyết", day:8, time:"05:02" }, { name:"Đông Chí", day:22, time:"22:59" }]
    },
    1952: {
        1:  [{ name:"Tiểu Hàn", day:6, time:"16:09" }, { name:"Đại Hàn", day:21, time:"09:37" }],
        2:  [{ name:"Lập Xuân", day:5, time:"03:52" }, { name:"Vũ Thủy", day:19, time:"23:56" }],
        3:  [{ name:"Kinh Trập", day:5, time:"22:06" }, { name:"Xuân Phân", day:20, time:"23:13" }],
        4:  [{ name:"Thanh Minh", day:5, time:"03:14" }, { name:"Cốc Vũ", day:20, time:"10:36" }],
        5:  [{ name:"Lập Hạ", day:5, time:"20:53" }, { name:"Tiểu Mãn", day:21, time:"10:03" }],
        6:  [{ name:"Mang Chủng", day:6, time:"01:19" }, { name:"Hạ Chí", day:21, time:"18:12" }],
        7:  [{ name:"Tiểu Thử", day:7, time:"11:44" }, { name:"Đại Thử", day:23, time:"05:07" }],
        8:  [{ name:"Lập Thu", day:7, time:"21:31" }, { name:"Xử Thử", day:23, time:"12:02" }],
        9:  [{ name:"Bạch Lộ", day:8, time:"00:13" }, { name:"Thu Phân", day:23, time:"09:23" }],
        10:  [{ name:"Hàn Lộ", day:8, time:"15:32" }, { name:"Sương Giáng", day:23, time:"18:21" }],
        11:  [{ name:"Lập Đông", day:7, time:"18:21" }, { name:"Tiểu Tuyết", day:22, time:"15:35" }],
        12:  [{ name:"Đại Tuyết", day:7, time:"10:55" }, { name:"Đông Chí", day:22, time:"04:43" }]
    },
    1953: {
        1:  [{ name:"Tiểu Hàn", day:5, time:"22:01" }, { name:"Đại Hàn", day:20, time:"15:21" }],
        2:  [{ name:"Lập Xuân", day:4, time:"09:45" }, { name:"Vũ Thủy", day:19, time:"05:40" }],
        3:  [{ name:"Kinh Trập", day:6, time:"04:02" }, { name:"Xuân Phân", day:21, time:"05:00" }],
        4:  [{ name:"Thanh Minh", day:5, time:"09:12" }, { name:"Cốc Vũ", day:20, time:"16:25" }],
        5:  [{ name:"Lập Hạ", day:6, time:"02:52" }, { name:"Tiểu Mãn", day:21, time:"15:52" }],
        6:  [{ name:"Mang Chủng", day:6, time:"07:15" }, { name:"Hạ Chí", day:21, time:"23:59" }],
        7:  [{ name:"Tiểu Thử", day:7, time:"17:34" }, { name:"Đại Thử", day:23, time:"10:51" }],
        8:  [{ name:"Lập Thu", day:8, time:"03:14" }, { name:"Xử Thử", day:23, time:"17:45" }],
        9:  [{ name:"Bạch Lộ", day:8, time:"05:52" }, { name:"Thu Phân", day:23, time:"15:05" }],
        10:  [{ name:"Hàn Lộ", day:8, time:"21:10" }, { name:"Sương Giáng", day:24, time:"00:05" }],
        11:  [{ name:"Lập Đông", day:8, time:"00:00" }, { name:"Tiểu Tuyết", day:22, time:"21:21" }],
        12:  [{ name:"Đại Tuyết", day:7, time:"16:36" }, { name:"Đông Chí", day:22, time:"10:31" }]
    },
    1954: {
        1:  [{ name:"Tiểu Hàn", day:6, time:"03:45" }, { name:"Đại Hàn", day:20, time:"21:10" }],
        2:  [{ name:"Lập Xuân", day:4, time:"15:30" }, { name:"Vũ Thủy", day:19, time:"11:31" }],
        3:  [{ name:"Kinh Trập", day:6, time:"09:47" }, { name:"Xuân Phân", day:21, time:"10:52" }],
        4:  [{ name:"Thanh Minh", day:5, time:"14:58" }, { name:"Cốc Vũ", day:20, time:"22:19" }],
        5:  [{ name:"Lập Hạ", day:6, time:"08:38" }, { name:"Tiểu Mãn", day:21, time:"21:47" }],
        6:  [{ name:"Mang Chủng", day:6, time:"13:00" }, { name:"Hạ Chí", day:22, time:"05:54" }],
        7:  [{ name:"Tiểu Thử", day:7, time:"23:18" }, { name:"Đại Thử", day:23, time:"16:44" }],
        8:  [{ name:"Lập Thu", day:8, time:"08:58" }, { name:"Xử Thử", day:23, time:"23:35" }],
        9:  [{ name:"Bạch Lộ", day:8, time:"11:37" }, { name:"Thu Phân", day:23, time:"20:55" }],
        10:  [{ name:"Hàn Lộ", day:9, time:"02:57" }, { name:"Sương Giáng", day:24, time:"05:56" }],
        11:  [{ name:"Lập Đông", day:8, time:"05:50" }, { name:"Tiểu Tuyết", day:23, time:"03:13" }],
        12:  [{ name:"Đại Tuyết", day:7, time:"22:28" }, { name:"Đông Chí", day:22, time:"16:23" }]
    },
    1955: {
        1:  [{ name:"Tiểu Hàn", day:6, time:"09:35" }, { name:"Đại Hàn", day:21, time:"03:01" }],
        2:  [{ name:"Lập Xuân", day:4, time:"21:17" }, { name:"Vũ Thủy", day:19, time:"17:18" }],
        3:  [{ name:"Kinh Trập", day:6, time:"15:31" }, { name:"Xuân Phân", day:21, time:"16:35" }],
        4:  [{ name:"Thanh Minh", day:5, time:"20:38" }, { name:"Cốc Vũ", day:21, time:"03:57" }],
        5:  [{ name:"Lập Hạ", day:6, time:"14:18" }, { name:"Tiểu Mãn", day:22, time:"03:24" }],
        6:  [{ name:"Mang Chủng", day:6, time:"18:43" }, { name:"Hạ Chí", day:22, time:"11:31" }],
        7:  [{ name:"Tiểu Thử", day:8, time:"05:06" }, { name:"Đại Thử", day:23, time:"22:24" }],
        8:  [{ name:"Lập Thu", day:8, time:"14:49" }, { name:"Xử Thử", day:24, time:"05:18" }],
        9:  [{ name:"Bạch Lộ", day:8, time:"17:31" }, { name:"Thu Phân", day:24, time:"02:40" }],
        10:  [{ name:"Hàn Lộ", day:9, time:"08:51" }, { name:"Sương Giáng", day:24, time:"11:42" }],
        11:  [{ name:"Lập Đông", day:8, time:"11:45" }, { name:"Tiểu Tuyết", day:23, time:"09:00" }],
        12:  [{ name:"Đại Tuyết", day:8, time:"04:22" }, { name:"Đông Chí", day:22, time:"22:10" }]
    },
    1956: {
        1:  [{ name:"Tiểu Hàn", day:6, time:"15:30" }, { name:"Đại Hàn", day:21, time:"08:48" }],
        2:  [{ name:"Lập Xuân", day:5, time:"03:12" }, { name:"Vũ Thủy", day:19, time:"23:05" }],
        3:  [{ name:"Kinh Trập", day:5, time:"21:24" }, { name:"Xuân Phân", day:20, time:"22:20" }],
        4:  [{ name:"Thanh Minh", day:5, time:"02:31" }, { name:"Cốc Vũ", day:20, time:"09:43" }],
        5:  [{ name:"Lập Hạ", day:5, time:"20:10" }, { name:"Tiểu Mãn", day:21, time:"09:12" }],
        6:  [{ name:"Mang Chủng", day:6, time:"00:35" }, { name:"Hạ Chí", day:21, time:"17:23" }],
        7:  [{ name:"Tiểu Thử", day:7, time:"10:58" }, { name:"Đại Thử", day:23, time:"04:20" }],
        8:  [{ name:"Lập Thu", day:7, time:"20:40" }, { name:"Xử Thử", day:23, time:"11:14" }],
        9:  [{ name:"Bạch Lộ", day:7, time:"23:19" }, { name:"Thu Phân", day:23, time:"08:34" }],
        10:  [{ name:"Hàn Lộ", day:8, time:"14:35" }, { name:"Sương Giáng", day:23, time:"17:34" }],
        11:  [{ name:"Lập Đông", day:7, time:"17:26" }, { name:"Tiểu Tuyết", day:22, time:"14:49" }],
        12:  [{ name:"Đại Tuyết", day:7, time:"10:02" }, { name:"Đông Chí", day:22, time:"03:59" }]
    },
    1957: {
        1:  [{ name:"Tiểu Hàn", day:5, time:"21:10" }, { name:"Đại Hàn", day:20, time:"14:38" }],
        2:  [{ name:"Lập Xuân", day:4, time:"08:54" }, { name:"Vũ Thủy", day:19, time:"04:57" }],
        3:  [{ name:"Kinh Trập", day:6, time:"03:09" }, { name:"Xuân Phân", day:21, time:"04:16" }],
        4:  [{ name:"Thanh Minh", day:5, time:"08:18" }, { name:"Cốc Vũ", day:20, time:"15:41" }],
        5:  [{ name:"Lập Hạ", day:6, time:"01:58" }, { name:"Tiểu Mãn", day:21, time:"15:10" }],
        6:  [{ name:"Mang Chủng", day:6, time:"06:24" }, { name:"Hạ Chí", day:21, time:"23:20" }],
        7:  [{ name:"Tiểu Thử", day:7, time:"16:48" }, { name:"Đại Thử", day:23, time:"10:14" }],
        8:  [{ name:"Lập Thu", day:8, time:"02:32" }, { name:"Xử Thử", day:23, time:"17:07" }],
        9:  [{ name:"Bạch Lộ", day:8, time:"05:12" }, { name:"Thu Phân", day:23, time:"14:26" }],
        10:  [{ name:"Hàn Lộ", day:8, time:"20:29" }, { name:"Sương Giáng", day:23, time:"23:23" }],
        11:  [{ name:"Lập Đông", day:7, time:"23:19" }, { name:"Tiểu Tuyết", day:22, time:"20:38" }],
        12:  [{ name:"Đại Tuyết", day:7, time:"15:55" }, { name:"Đông Chí", day:22, time:"09:48" }]
    },
    1958: {
        1:  [{ name:"Tiểu Hàn", day:6, time:"03:04" }, { name:"Đại Hàn", day:20, time:"20:28" }],
        2:  [{ name:"Lập Xuân", day:4, time:"14:49" }, { name:"Vũ Thủy", day:19, time:"10:48" }],
        3:  [{ name:"Kinh Trập", day:6, time:"09:04" }, { name:"Xuân Phân", day:21, time:"10:05" }],
        4:  [{ name:"Thanh Minh", day:5, time:"14:12" }, { name:"Cốc Vũ", day:20, time:"21:26" }],
        5:  [{ name:"Lập Hạ", day:6, time:"07:49" }, { name:"Tiểu Mãn", day:21, time:"20:50" }],
        6:  [{ name:"Mang Chủng", day:6, time:"12:12" }, { name:"Hạ Chí", day:22, time:"04:56" }],
        7:  [{ name:"Tiểu Thử", day:7, time:"22:33" }, { name:"Đại Thử", day:23, time:"15:50" }],
        8:  [{ name:"Lập Thu", day:8, time:"08:16" }, { name:"Xử Thử", day:23, time:"22:45" }],
        9:  [{ name:"Bạch Lộ", day:8, time:"10:58" }, { name:"Thu Phân", day:23, time:"20:08" }],
        10:  [{ name:"Hàn Lộ", day:9, time:"02:18" }, { name:"Sương Giáng", day:24, time:"05:11" }],
        11:  [{ name:"Lập Đông", day:8, time:"05:11" }, { name:"Tiểu Tuyết", day:23, time:"02:28" }],
        12:  [{ name:"Đại Tuyết", day:7, time:"21:49" }, { name:"Đông Chí", day:22, time:"15:39" }]
    },
    1959: {
        1:  [{ name:"Tiểu Hàn", day:6, time:"08:58" }, { name:"Đại Hàn", day:21, time:"02:18" }],
        2:  [{ name:"Lập Xuân", day:4, time:"20:42" }, { name:"Vũ Thủy", day:19, time:"16:37" }],
        3:  [{ name:"Kinh Trập", day:6, time:"14:56" }, { name:"Xuân Phân", day:21, time:"15:54" }],
        4:  [{ name:"Thanh Minh", day:5, time:"20:02" }, { name:"Cốc Vũ", day:21, time:"03:16" }],
        5:  [{ name:"Lập Hạ", day:6, time:"13:38" }, { name:"Tiểu Mãn", day:22, time:"02:41" }],
        6:  [{ name:"Mang Chủng", day:6, time:"17:59" }, { name:"Hạ Chí", day:22, time:"10:49" }],
        7:  [{ name:"Tiểu Thử", day:8, time:"04:19" }, { name:"Đại Thử", day:23, time:"21:45" }],
        8:  [{ name:"Lập Thu", day:8, time:"14:03" }, { name:"Xử Thử", day:24, time:"04:43" }],
        9:  [{ name:"Bạch Lộ", day:8, time:"16:47" }, { name:"Thu Phân", day:24, time:"02:08" }],
        10:  [{ name:"Hàn Lộ", day:9, time:"08:09" }, { name:"Sương Giáng", day:24, time:"11:10" }],
        11:  [{ name:"Lập Đông", day:8, time:"11:01" }, { name:"Tiểu Tuyết", day:23, time:"08:26" }],
        12:  [{ name:"Đại Tuyết", day:8, time:"03:37" }, { name:"Đông Chí", day:22, time:"21:33" }]
    },
    1960: {
        1:  [{ name:"Tiểu Hàn", day:6, time:"14:42" }, { name:"Đại Hàn", day:21, time:"08:09" }],
        2:  [{ name:"Lập Xuân", day:5, time:"02:22" }, { name:"Vũ Thủy", day:19, time:"22:26" }],
        3:  [{ name:"Kinh Trập", day:5, time:"20:35" }, { name:"Xuân Phân", day:20, time:"21:42" }],
        4:  [{ name:"Thanh Minh", day:5, time:"01:43" }, { name:"Cốc Vũ", day:20, time:"09:05" }],
        5:  [{ name:"Lập Hạ", day:5, time:"19:22" }, { name:"Tiểu Mãn", day:21, time:"08:33" }],
        6:  [{ name:"Mang Chủng", day:5, time:"23:48" }, { name:"Hạ Chí", day:21, time:"16:42" }],
        7:  [{ name:"Tiểu Thử", day:7, time:"10:12" }, { name:"Đại Thử", day:23, time:"03:37" }],
        8:  [{ name:"Lập Thu", day:7, time:"19:59" }, { name:"Xử Thử", day:23, time:"10:34" }],
        9:  [{ name:"Bạch Lộ", day:7, time:"22:45" }, { name:"Thu Phân", day:23, time:"07:58" }],
        10:  [{ name:"Hàn Lộ", day:8, time:"14:08" }, { name:"Sương Giáng", day:23, time:"17:01" }],
        11:  [{ name:"Lập Đông", day:7, time:"17:01" }, { name:"Tiểu Tuyết", day:22, time:"14:18" }],
        12:  [{ name:"Đại Tuyết", day:7, time:"09:37" }, { name:"Đông Chí", day:22, time:"03:25" }]
    },
    1961: {
        1:  [{ name:"Tiểu Hàn", day:5, time:"20:42" }, { name:"Đại Hàn", day:20, time:"14:01" }],
        2:  [{ name:"Lập Xuân", day:4, time:"08:22" }, { name:"Vũ Thủy", day:19, time:"04:16" }],
        3:  [{ name:"Kinh Trập", day:6, time:"02:34" }, { name:"Xuân Phân", day:21, time:"03:31" }],
        4:  [{ name:"Thanh Minh", day:5, time:"07:42" }, { name:"Cốc Vũ", day:20, time:"14:54" }],
        5:  [{ name:"Lập Hạ", day:6, time:"01:21" }, { name:"Tiểu Mãn", day:21, time:"14:22" }],
        6:  [{ name:"Mang Chủng", day:6, time:"05:46" }, { name:"Hạ Chí", day:21, time:"22:29" }],
        7:  [{ name:"Tiểu Thử", day:7, time:"16:06" }, { name:"Đại Thử", day:23, time:"09:23" }],
        8:  [{ name:"Lập Thu", day:8, time:"01:48" }, { name:"Xử Thử", day:23, time:"16:18" }],
        9:  [{ name:"Bạch Lộ", day:8, time:"04:29" }, { name:"Thu Phân", day:23, time:"13:42" }],
        10:  [{ name:"Hàn Lộ", day:8, time:"19:50" }, { name:"Sương Giáng", day:23, time:"22:46" }],
        11:  [{ name:"Lập Đông", day:7, time:"22:45" }, { name:"Tiểu Tuyết", day:22, time:"20:07" }],
        12:  [{ name:"Đại Tuyết", day:7, time:"15:25" }, { name:"Đông Chí", day:22, time:"09:19" }]
    },
    1962: {
        1:  [{ name:"Tiểu Hàn", day:6, time:"02:34" }, { name:"Đại Hàn", day:20, time:"19:57" }],
        2:  [{ name:"Lập Xuân", day:4, time:"14:17" }, { name:"Vũ Thủy", day:19, time:"10:14" }],
        3:  [{ name:"Kinh Trập", day:6, time:"08:29" }, { name:"Xuân Phân", day:21, time:"09:29" }],
        4:  [{ name:"Thanh Minh", day:5, time:"13:33" }, { name:"Cốc Vũ", day:20, time:"20:50" }],
        5:  [{ name:"Lập Hạ", day:6, time:"07:09" }, { name:"Tiểu Mãn", day:21, time:"20:16" }],
        6:  [{ name:"Mang Chủng", day:6, time:"11:31" }, { name:"Hạ Chí", day:22, time:"04:24" }],
        7:  [{ name:"Tiểu Thử", day:7, time:"21:51" }, { name:"Đại Thử", day:23, time:"15:17" }],
        8:  [{ name:"Lập Thu", day:8, time:"07:33" }, { name:"Xử Thử", day:23, time:"22:12" }],
        9:  [{ name:"Bạch Lộ", day:8, time:"10:15" }, { name:"Thu Phân", day:23, time:"19:35" }],
        10:  [{ name:"Hàn Lộ", day:9, time:"01:38" }, { name:"Sương Giáng", day:24, time:"04:40" }],
        11:  [{ name:"Lập Đông", day:8, time:"04:34" }, { name:"Tiểu Tuyết", day:23, time:"02:01" }],
        12:  [{ name:"Đại Tuyết", day:7, time:"21:16" }, { name:"Đông Chí", day:22, time:"15:14" }]
    },
    1963: {
        1:  [{ name:"Tiểu Hàn", day:6, time:"08:25" }, { name:"Đại Hàn", day:21, time:"01:53" }],
        2:  [{ name:"Lập Xuân", day:4, time:"20:07" }, { name:"Vũ Thủy", day:19, time:"16:08" }],
        3:  [{ name:"Kinh Trập", day:6, time:"14:17" }, { name:"Xuân Phân", day:21, time:"15:19" }],
        4:  [{ name:"Thanh Minh", day:5, time:"19:18" }, { name:"Cốc Vũ", day:21, time:"02:35" }],
        5:  [{ name:"Lập Hạ", day:6, time:"12:51" }, { name:"Tiểu Mãn", day:22, time:"01:57" }],
        6:  [{ name:"Mang Chủng", day:6, time:"17:14" }, { name:"Hạ Chí", day:22, time:"10:03" }],
        7:  [{ name:"Tiểu Thử", day:8, time:"03:37" }, { name:"Đại Thử", day:23, time:"20:59" }],
        8:  [{ name:"Lập Thu", day:8, time:"13:25" }, { name:"Xử Thử", day:24, time:"03:57" }],
        9:  [{ name:"Bạch Lộ", day:8, time:"16:11" }, { name:"Thu Phân", day:24, time:"01:23" }],
        10:  [{ name:"Hàn Lộ", day:9, time:"07:36" }, { name:"Sương Giáng", day:24, time:"10:28" }],
        11:  [{ name:"Lập Đông", day:8, time:"10:32" }, { name:"Tiểu Tuyết", day:23, time:"07:49" }],
        12:  [{ name:"Đại Tuyết", day:8, time:"03:12" }, { name:"Đông Chí", day:22, time:"21:01" }]
    },
    1964: {
        1:  [{ name:"Tiểu Hàn", day:6, time:"14:21" }, { name:"Đại Hàn", day:21, time:"07:40" }],
        2:  [{ name:"Lập Xuân", day:5, time:"02:04" }, { name:"Vũ Thủy", day:19, time:"21:57" }],
        3:  [{ name:"Kinh Trập", day:5, time:"20:15" }, { name:"Xuân Phân", day:20, time:"21:09" }],
        4:  [{ name:"Thanh Minh", day:5, time:"01:18" }, { name:"Cốc Vũ", day:20, time:"08:27" }],
        5:  [{ name:"Lập Hạ", day:5, time:"18:50" }, { name:"Tiểu Mãn", day:21, time:"07:49" }],
        6:  [{ name:"Mang Chủng", day:5, time:"23:11" }, { name:"Hạ Chí", day:21, time:"15:56" }],
        7:  [{ name:"Tiểu Thử", day:7, time:"09:31" }, { name:"Đại Thử", day:23, time:"02:52" }],
        8:  [{ name:"Lập Thu", day:7, time:"19:16" }, { name:"Xử Thử", day:23, time:"09:51" }],
        9:  [{ name:"Bạch Lộ", day:7, time:"21:59" }, { name:"Thu Phân", day:23, time:"07:16" }],
        10:  [{ name:"Hàn Lộ", day:8, time:"13:21" }, { name:"Sương Giáng", day:23, time:"16:20" }],
        11:  [{ name:"Lập Đông", day:7, time:"16:14" }, { name:"Tiểu Tuyết", day:22, time:"13:38" }],
        12:  [{ name:"Đại Tuyết", day:7, time:"08:52" }, { name:"Đông Chí", day:22, time:"02:49" }]
    },
    1965: {
        1:  [{ name:"Tiểu Hàn", day:5, time:"20:01" }, { name:"Đại Hàn", day:20, time:"13:28" }],
        2:  [{ name:"Lập Xuân", day:4, time:"07:45" }, { name:"Vũ Thủy", day:19, time:"03:47" }],
        3:  [{ name:"Kinh Trập", day:6, time:"02:00" }, { name:"Xuân Phân", day:21, time:"03:04" }],
        4:  [{ name:"Thanh Minh", day:5, time:"07:06" }, { name:"Cốc Vũ", day:20, time:"14:26" }],
        5:  [{ name:"Lập Hạ", day:6, time:"00:41" }, { name:"Tiểu Mãn", day:21, time:"13:50" }],
        6:  [{ name:"Mang Chủng", day:6, time:"05:02" }, { name:"Hạ Chí", day:21, time:"21:55" }],
        7:  [{ name:"Tiểu Thử", day:7, time:"15:20" }, { name:"Đại Thử", day:23, time:"08:47" }],
        8:  [{ name:"Lập Thu", day:8, time:"01:04" }, { name:"Xử Thử", day:23, time:"15:42" }],
        9:  [{ name:"Bạch Lộ", day:8, time:"03:47" }, { name:"Thu Phân", day:23, time:"13:05" }],
        10:  [{ name:"Hàn Lộ", day:8, time:"19:10" }, { name:"Sương Giáng", day:23, time:"22:09" }],
        11:  [{ name:"Lập Đông", day:7, time:"22:05" }, { name:"Tiểu Tuyết", day:22, time:"19:28" }],
        12:  [{ name:"Đại Tuyết", day:7, time:"14:45" }, { name:"Đông Chí", day:22, time:"08:40" }]
    },
    1966: {
        1:  [{ name:"Tiểu Hàn", day:6, time:"01:54" }, { name:"Đại Hàn", day:20, time:"19:19" }],
        2:  [{ name:"Lập Xuân", day:4, time:"13:37" }, { name:"Vũ Thủy", day:19, time:"09:37" }],
        3:  [{ name:"Kinh Trập", day:6, time:"07:51" }, { name:"Xuân Phân", day:21, time:"08:52" }],
        4:  [{ name:"Thanh Minh", day:5, time:"12:56" }, { name:"Cốc Vũ", day:20, time:"20:11" }],
        5:  [{ name:"Lập Hạ", day:6, time:"06:30" }, { name:"Tiểu Mãn", day:21, time:"19:31" }],
        6:  [{ name:"Mang Chủng", day:6, time:"10:49" }, { name:"Hạ Chí", day:22, time:"03:33" }],
        7:  [{ name:"Tiểu Thử", day:7, time:"21:06" }, { name:"Đại Thử", day:23, time:"14:22" }],
        8:  [{ name:"Lập Thu", day:8, time:"06:48" }, { name:"Xử Thử", day:23, time:"21:17" }],
        9:  [{ name:"Bạch Lộ", day:8, time:"09:31" }, { name:"Thu Phân", day:23, time:"18:43" }],
        10:  [{ name:"Hàn Lộ", day:9, time:"00:56" }, { name:"Sương Giáng", day:24, time:"03:50" }],
        11:  [{ name:"Lập Đông", day:8, time:"03:55" }, { name:"Tiểu Tuyết", day:23, time:"01:14" }],
        12:  [{ name:"Đại Tuyết", day:7, time:"20:37" }, { name:"Đông Chí", day:22, time:"14:27" }]
    },
    1967: {
        1:  [{ name:"Tiểu Hàn", day:6, time:"07:47" }, { name:"Đại Hàn", day:21, time:"01:07" }],
        2:  [{ name:"Lập Xuân", day:4, time:"19:30" }, { name:"Vũ Thủy", day:19, time:"15:23" }],
        3:  [{ name:"Kinh Trập", day:6, time:"13:41" }, { name:"Xuân Phân", day:21, time:"14:36" }],
        4:  [{ name:"Thanh Minh", day:5, time:"18:44" }, { name:"Cốc Vũ", day:21, time:"01:55" }],
        5:  [{ name:"Lập Hạ", day:6, time:"12:17" }, { name:"Tiểu Mãn", day:22, time:"01:18" }],
        6:  [{ name:"Mang Chủng", day:6, time:"16:36" }, { name:"Hạ Chí", day:22, time:"09:22" }],
        7:  [{ name:"Tiểu Thử", day:8, time:"02:53" }, { name:"Đại Thử", day:23, time:"20:15" }],
        8:  [{ name:"Lập Thu", day:8, time:"12:34" }, { name:"Xử Thử", day:24, time:"03:12" }],
        9:  [{ name:"Bạch Lộ", day:8, time:"15:17" }, { name:"Thu Phân", day:24, time:"00:37" }],
        10:  [{ name:"Hàn Lộ", day:9, time:"06:41" }, { name:"Sương Giáng", day:24, time:"09:43" }],
        11:  [{ name:"Lập Đông", day:8, time:"09:37" }, { name:"Tiểu Tuyết", day:23, time:"07:04" }],
        12:  [{ name:"Đại Tuyết", day:8, time:"02:17" }, { name:"Đông Chí", day:22, time:"20:16" }]
    },
    1968: {
        1:  [{ name:"Tiểu Hàn", day:6, time:"13:25" }, { name:"Đại Hàn", day:21, time:"06:53" }],
        2:  [{ name:"Lập Xuân", day:5, time:"01:06" }, { name:"Vũ Thủy", day:19, time:"21:08" }],
        3:  [{ name:"Kinh Trập", day:5, time:"19:17" }, { name:"Xuân Phân", day:20, time:"20:21" }],
        4:  [{ name:"Thanh Minh", day:5, time:"00:20" }, { name:"Cốc Vũ", day:20, time:"07:40" }],
        5:  [{ name:"Lập Hạ", day:5, time:"17:55" }, { name:"Tiểu Mãn", day:21, time:"07:05" }],
        6:  [{ name:"Mang Chủng", day:5, time:"22:18" }, { name:"Hạ Chí", day:21, time:"15:13" }],
        7:  [{ name:"Tiểu Thử", day:7, time:"08:41" }, { name:"Đại Thử", day:23, time:"02:07" }],
        8:  [{ name:"Lập Thu", day:7, time:"18:27" }, { name:"Xử Thử", day:23, time:"09:02" }],
        9:  [{ name:"Bạch Lộ", day:7, time:"21:11" }, { name:"Thu Phân", day:23, time:"06:25" }],
        10:  [{ name:"Hàn Lộ", day:8, time:"12:34" }, { name:"Sương Giáng", day:23, time:"15:29" }],
        11:  [{ name:"Lập Đông", day:7, time:"15:29" }, { name:"Tiểu Tuyết", day:22, time:"12:48" }],
        12:  [{ name:"Đại Tuyết", day:7, time:"08:08" }, { name:"Đông Chí", day:22, time:"01:59" }]
    },
    1969: {
        1:  [{ name:"Tiểu Hàn", day:5, time:"19:16" }, { name:"Đại Hàn", day:20, time:"12:38" }],
        2:  [{ name:"Lập Xuân", day:4, time:"06:58" }, { name:"Vũ Thủy", day:19, time:"02:54" }],
        3:  [{ name:"Kinh Trập", day:6, time:"01:10" }, { name:"Xuân Phân", day:21, time:"02:07" }],
        4:  [{ name:"Thanh Minh", day:5, time:"06:14" }, { name:"Cốc Vũ", day:20, time:"13:26" }],
        5:  [{ name:"Lập Hạ", day:5, time:"23:49" }, { name:"Tiểu Mãn", day:21, time:"12:49" }],
        6:  [{ name:"Mang Chủng", day:6, time:"04:11" }, { name:"Hạ Chí", day:21, time:"20:54" }],
        7:  [{ name:"Tiểu Thử", day:7, time:"14:31" }, { name:"Đại Thử", day:23, time:"07:47" }],
        8:  [{ name:"Lập Thu", day:8, time:"00:14" }, { name:"Xử Thử", day:23, time:"14:43" }],
        9:  [{ name:"Bạch Lộ", day:8, time:"02:55" }, { name:"Thu Phân", day:23, time:"12:06" }],
        10:  [{ name:"Hàn Lộ", day:8, time:"18:16" }, { name:"Sương Giáng", day:23, time:"21:10" }],
        11:  [{ name:"Lập Đông", day:7, time:"21:11" }, { name:"Tiểu Tuyết", day:22, time:"18:30" }],
        12:  [{ name:"Đại Tuyết", day:7, time:"13:50" }, { name:"Đông Chí", day:22, time:"07:43" }]
    },
    1970: {
        1:  [{ name:"Tiểu Hàn", day:6, time:"01:01" }, { name:"Đại Hàn", day:20, time:"18:23" }],
        2:  [{ name:"Lập Xuân", day:4, time:"12:45" }, { name:"Vũ Thủy", day:19, time:"08:41" }],
        3:  [{ name:"Kinh Trập", day:6, time:"06:57" }, { name:"Xuân Phân", day:21, time:"07:55" }],
        4:  [{ name:"Thanh Minh", day:5, time:"12:01" }, { name:"Cốc Vũ", day:20, time:"19:14" }],
        5:  [{ name:"Lập Hạ", day:6, time:"05:33" }, { name:"Tiểu Mãn", day:21, time:"18:37" }],
        6:  [{ name:"Mang Chủng", day:6, time:"09:52" }, { name:"Hạ Chí", day:22, time:"02:42" }],
        7:  [{ name:"Tiểu Thử", day:7, time:"20:10" }, { name:"Đại Thử", day:23, time:"13:36" }],
        8:  [{ name:"Lập Thu", day:8, time:"05:53" }, { name:"Xử Thử", day:23, time:"20:33" }],
        9:  [{ name:"Bạch Lộ", day:8, time:"08:37" }, { name:"Thu Phân", day:23, time:"17:58" }],
        10:  [{ name:"Hàn Lộ", day:9, time:"00:01" }, { name:"Sương Giáng", day:24, time:"03:03" }],
        11:  [{ name:"Lập Đông", day:8, time:"02:57" }, { name:"Tiểu Tuyết", day:23, time:"00:24" }],
        12:  [{ name:"Đại Tuyết", day:7, time:"19:36" }, { name:"Đông Chí", day:22, time:"13:35" }]
    },
    1971: {
        1:  [{ name:"Tiểu Hàn", day:6, time:"06:44" }, { name:"Đại Hàn", day:21, time:"00:12" }],
        2:  [{ name:"Lập Xuân", day:4, time:"18:25" }, { name:"Vũ Thủy", day:19, time:"14:26" }],
        3:  [{ name:"Kinh Trập", day:6, time:"12:34" }, { name:"Xuân Phân", day:21, time:"13:37" }],
        4:  [{ name:"Thanh Minh", day:5, time:"17:35" }, { name:"Cốc Vũ", day:21, time:"00:53" }],
        5:  [{ name:"Lập Hạ", day:6, time:"11:07" }, { name:"Tiểu Mãn", day:22, time:"00:14" }],
        6:  [{ name:"Mang Chủng", day:6, time:"15:28" }, { name:"Hạ Chí", day:22, time:"08:19" }],
        7:  [{ name:"Tiểu Thử", day:8, time:"01:50" }, { name:"Đại Thử", day:23, time:"19:14" }],
        8:  [{ name:"Lập Thu", day:8, time:"11:39" }, { name:"Xử Thử", day:24, time:"02:14" }],
        9:  [{ name:"Bạch Lộ", day:8, time:"14:29" }, { name:"Thu Phân", day:23, time:"23:44" }],
        10:  [{ name:"Hàn Lộ", day:9, time:"05:57" }, { name:"Sương Giáng", day:24, time:"08:52" }],
        11:  [{ name:"Lập Đông", day:8, time:"08:55" }, { name:"Tiểu Tuyết", day:23, time:"06:13" }],
        12:  [{ name:"Đại Tuyết", day:8, time:"01:35" }, { name:"Đông Chí", day:22, time:"19:23" }]
    },
    1972: {
        1:  [{ name:"Tiểu Hàn", day:6, time:"12:41" }, { name:"Đại Hàn", day:21, time:"05:58" }],
        2:  [{ name:"Lập Xuân", day:5, time:"00:19" }, { name:"Vũ Thủy", day:19, time:"20:10" }],
        3:  [{ name:"Kinh Trập", day:5, time:"18:27" }, { name:"Xuân Phân", day:20, time:"19:20" }],
        4:  [{ name:"Thanh Minh", day:4, time:"23:28" }, { name:"Cốc Vũ", day:20, time:"06:37" }],
        5:  [{ name:"Lập Hạ", day:5, time:"17:00" }, { name:"Tiểu Mãn", day:21, time:"05:59" }],
        6:  [{ name:"Mang Chủng", day:5, time:"21:21" }, { name:"Hạ Chí", day:21, time:"14:05" }],
        7:  [{ name:"Tiểu Thử", day:7, time:"07:42" }, { name:"Đại Thử", day:23, time:"01:02" }],
        8:  [{ name:"Lập Thu", day:7, time:"17:28" }, { name:"Xử Thử", day:23, time:"08:02" }],
        9:  [{ name:"Bạch Lộ", day:7, time:"20:15" }, { name:"Thu Phân", day:23, time:"05:32" }],
        10:  [{ name:"Hàn Lộ", day:8, time:"11:41" }, { name:"Sương Giáng", day:23, time:"14:40" }],
        11:  [{ name:"Lập Đông", day:7, time:"14:38" }, { name:"Tiểu Tuyết", day:22, time:"12:01" }],
        12:  [{ name:"Đại Tuyết", day:7, time:"07:18" }, { name:"Đông Chí", day:22, time:"01:12" }]
    },
    1973: {
        1:  [{ name:"Tiểu Hàn", day:5, time:"18:25" }, { name:"Đại Hàn", day:20, time:"11:48" }],
        2:  [{ name:"Lập Xuân", day:4, time:"06:03" }, { name:"Vũ Thủy", day:19, time:"02:00" }],
        3:  [{ name:"Kinh Trập", day:6, time:"00:12" }, { name:"Xuân Phân", day:21, time:"01:12" }],
        4:  [{ name:"Thanh Minh", day:5, time:"05:13" }, { name:"Cốc Vũ", day:20, time:"12:30" }],
        5:  [{ name:"Lập Hạ", day:5, time:"22:46" }, { name:"Tiểu Mãn", day:21, time:"11:53" }],
        6:  [{ name:"Mang Chủng", day:6, time:"03:06" }, { name:"Hạ Chí", day:21, time:"20:00" }],
        7:  [{ name:"Tiểu Thử", day:7, time:"13:26" }, { name:"Đại Thử", day:23, time:"06:55" }],
        8:  [{ name:"Lập Thu", day:7, time:"23:12" }, { name:"Xử Thử", day:23, time:"13:53" }],
        9:  [{ name:"Bạch Lộ", day:8, time:"01:59" }, { name:"Thu Phân", day:23, time:"11:20" }],
        10:  [{ name:"Hàn Lộ", day:8, time:"17:26" }, { name:"Sương Giáng", day:23, time:"20:29" }],
        11:  [{ name:"Lập Đông", day:7, time:"20:27" }, { name:"Tiểu Tuyết", day:22, time:"17:53" }],
        12:  [{ name:"Đại Tuyết", day:7, time:"13:10" }, { name:"Đông Chí", day:22, time:"07:07" }]
    },
    1974: {
        1:  [{ name:"Tiểu Hàn", day:6, time:"00:19" }, { name:"Đại Hàn", day:20, time:"17:45" }],
        2:  [{ name:"Lập Xuân", day:4, time:"12:00" }, { name:"Vũ Thủy", day:19, time:"07:58" }],
        3:  [{ name:"Kinh Trập", day:6, time:"06:06" }, { name:"Xuân Phân", day:21, time:"07:06" }],
        4:  [{ name:"Thanh Minh", day:5, time:"11:04" }, { name:"Cốc Vũ", day:20, time:"18:18" }],
        5:  [{ name:"Lập Hạ", day:6, time:"04:33" }, { name:"Tiểu Mãn", day:21, time:"17:35" }],
        6:  [{ name:"Mang Chủng", day:6, time:"08:51" }, { name:"Hạ Chí", day:22, time:"01:37" }],
        7:  [{ name:"Tiểu Thử", day:7, time:"19:10" }, { name:"Đại Thử", day:23, time:"12:29" }],
        8:  [{ name:"Lập Thu", day:8, time:"04:56" }, { name:"Xử Thử", day:23, time:"19:28" }],
        9:  [{ name:"Bạch Lộ", day:8, time:"07:44" }, { name:"Thu Phân", day:23, time:"16:58" }],
        10:  [{ name:"Hàn Lộ", day:8, time:"23:14" }, { name:"Sương Giáng", day:24, time:"02:10" }],
        11:  [{ name:"Lập Đông", day:8, time:"02:17" }, { name:"Tiểu Tuyết", day:22, time:"23:38" }],
        12:  [{ name:"Đại Tuyết", day:7, time:"19:04" }, { name:"Đông Chí", day:22, time:"12:55" }]
    },
    1975: {
        1:  [{ name:"Tiểu Hàn", day:6, time:"06:17" }, { name:"Đại Hàn", day:20, time:"23:35" }],
        2:  [{ name:"Lập Xuân", day:4, time:"17:58" }, { name:"Vũ Thủy", day:19, time:"13:49" }],
        3:  [{ name:"Kinh Trập", day:6, time:"12:05" }, { name:"Xuân Phân", day:21, time:"12:56" }],
        4:  [{ name:"Thanh Minh", day:5, time:"17:01" }, { name:"Cốc Vũ", day:21, time:"00:07" }],
        5:  [{ name:"Lập Hạ", day:6, time:"10:27" }, { name:"Tiểu Mãn", day:21, time:"23:23" }],
        6:  [{ name:"Mang Chủng", day:6, time:"14:41" }, { name:"Hạ Chí", day:22, time:"07:25" }],
        7:  [{ name:"Tiểu Thử", day:8, time:"00:58" }, { name:"Đại Thử", day:23, time:"18:21" }],
        8:  [{ name:"Lập Thu", day:8, time:"10:44" }, { name:"Xử Thử", day:24, time:"01:23" }],
        9:  [{ name:"Bạch Lộ", day:8, time:"13:32" }, { name:"Thu Phân", day:23, time:"22:54" }],
        10:  [{ name:"Hàn Lộ", day:9, time:"05:01" }, { name:"Sương Giáng", day:24, time:"08:05" }],
        11:  [{ name:"Lập Đông", day:8, time:"08:02" }, { name:"Tiểu Tuyết", day:23, time:"05:30" }],
        12:  [{ name:"Đại Tuyết", day:8, time:"00:45" }, { name:"Đông Chí", day:22, time:"18:45" }]
    },
    1976: {
        1:  [{ name:"Tiểu Hàn", day:6, time:"11:56" }, { name:"Đại Hàn", day:21, time:"05:24" }],
        2:  [{ name:"Lập Xuân", day:4, time:"23:39" }, { name:"Vũ Thủy", day:19, time:"19:39" }],
        3:  [{ name:"Kinh Trập", day:5, time:"17:47" }, { name:"Xuân Phân", day:20, time:"18:49" }],
        4:  [{ name:"Thanh Minh", day:4, time:"22:46" }, { name:"Cốc Vũ", day:20, time:"06:02" }],
        5:  [{ name:"Lập Hạ", day:5, time:"16:13" }, { name:"Tiểu Mãn", day:21, time:"05:20" }],
        6:  [{ name:"Mang Chủng", day:5, time:"20:30" }, { name:"Hạ Chí", day:21, time:"13:23" }],
        7:  [{ name:"Tiểu Thử", day:7, time:"06:50" }, { name:"Đại Thử", day:23, time:"00:18" }],
        8:  [{ name:"Lập Thu", day:7, time:"16:38" }, { name:"Xử Thử", day:23, time:"07:18" }],
        9:  [{ name:"Bạch Lộ", day:7, time:"19:28" }, { name:"Thu Phân", day:23, time:"04:48" }],
        10:  [{ name:"Hàn Lộ", day:8, time:"10:57" }, { name:"Sương Giáng", day:23, time:"13:57" }],
        11:  [{ name:"Lập Đông", day:7, time:"13:58" }, { name:"Tiểu Tuyết", day:22, time:"11:21" }],
        12:  [{ name:"Đại Tuyết", day:7, time:"06:40" }, { name:"Đông Chí", day:22, time:"00:34" }]
    },
    1977: {
        1:  [{ name:"Tiểu Hàn", day:5, time:"17:50" }, { name:"Đại Hàn", day:20, time:"11:14" }],
        2:  [{ name:"Lập Xuân", day:4, time:"05:33" }, { name:"Vũ Thủy", day:19, time:"01:30" }],
        3:  [{ name:"Kinh Trập", day:5, time:"23:44" }, { name:"Xuân Phân", day:21, time:"00:42" }],
        4:  [{ name:"Thanh Minh", day:5, time:"04:45" }, { name:"Cốc Vũ", day:20, time:"11:57" }],
        5:  [{ name:"Lập Hạ", day:5, time:"22:16" }, { name:"Tiểu Mãn", day:21, time:"11:14" }],
        6:  [{ name:"Mang Chủng", day:6, time:"02:32" }, { name:"Hạ Chí", day:21, time:"19:13" }],
        7:  [{ name:"Tiểu Thử", day:7, time:"12:47" }, { name:"Đại Thử", day:23, time:"06:03" }],
        8:  [{ name:"Lập Thu", day:7, time:"22:30" }, { name:"Xử Thử", day:23, time:"13:00" }],
        9:  [{ name:"Bạch Lộ", day:8, time:"01:15" }, { name:"Thu Phân", day:23, time:"10:29" }],
        10:  [{ name:"Hàn Lộ", day:8, time:"16:44" }, { name:"Sương Giáng", day:23, time:"19:40" }],
        11:  [{ name:"Lập Đông", day:7, time:"19:45" }, { name:"Tiểu Tuyết", day:22, time:"17:06" }],
        12:  [{ name:"Đại Tuyết", day:7, time:"12:30" }, { name:"Đông Chí", day:22, time:"06:22" }]
    },
    1978: {
        1:  [{ name:"Tiểu Hàn", day:5, time:"23:42" }, { name:"Đại Hàn", day:20, time:"17:03" }],
        2:  [{ name:"Lập Xuân", day:4, time:"11:26" }, { name:"Vũ Thủy", day:19, time:"07:20" }],
        3:  [{ name:"Kinh Trập", day:6, time:"05:37" }, { name:"Xuân Phân", day:21, time:"06:33" }],
        4:  [{ name:"Thanh Minh", day:5, time:"10:39" }, { name:"Cốc Vũ", day:20, time:"17:49" }],
        5:  [{ name:"Lập Hạ", day:6, time:"04:08" }, { name:"Tiểu Mãn", day:21, time:"17:08" }],
        6:  [{ name:"Mang Chủng", day:6, time:"08:23" }, { name:"Hạ Chí", day:22, time:"01:09" }],
        7:  [{ name:"Tiểu Thử", day:7, time:"18:37" }, { name:"Đại Thử", day:23, time:"12:00" }],
        8:  [{ name:"Lập Thu", day:8, time:"04:17" }, { name:"Xử Thử", day:23, time:"18:56" }],
        9:  [{ name:"Bạch Lộ", day:8, time:"07:02" }, { name:"Thu Phân", day:23, time:"16:25" }],
        10:  [{ name:"Hàn Lộ", day:8, time:"22:31" }, { name:"Sương Giáng", day:24, time:"01:37" }],
        11:  [{ name:"Lập Đông", day:8, time:"01:34" }, { name:"Tiểu Tuyết", day:22, time:"23:04" }],
        12:  [{ name:"Đại Tuyết", day:7, time:"18:19" }, { name:"Đông Chí", day:22, time:"12:20" }]
    },
    1979: {
        1:  [{ name:"Tiểu Hàn", day:6, time:"05:31" }, { name:"Đại Hàn", day:20, time:"22:59" }],
        2:  [{ name:"Lập Xuân", day:4, time:"17:11" }, { name:"Vũ Thủy", day:19, time:"13:12" }],
        3:  [{ name:"Kinh Trập", day:6, time:"11:19" }, { name:"Xuân Phân", day:21, time:"12:21" }],
        4:  [{ name:"Thanh Minh", day:5, time:"16:17" }, { name:"Cốc Vũ", day:20, time:"23:35" }],
        5:  [{ name:"Lập Hạ", day:6, time:"09:47" }, { name:"Tiểu Mãn", day:21, time:"22:53" }],
        6:  [{ name:"Mang Chủng", day:6, time:"14:05" }, { name:"Hạ Chí", day:22, time:"06:56" }],
        7:  [{ name:"Tiểu Thử", day:8, time:"00:24" }, { name:"Đại Thử", day:23, time:"17:48" }],
        8:  [{ name:"Lập Thu", day:8, time:"10:10" }, { name:"Xử Thử", day:24, time:"00:46" }],
        9:  [{ name:"Bạch Lộ", day:8, time:"12:59" }, { name:"Thu Phân", day:23, time:"22:15" }],
        10:  [{ name:"Hàn Lộ", day:9, time:"04:29" }, { name:"Sương Giáng", day:24, time:"07:27" }],
        11:  [{ name:"Lập Đông", day:8, time:"07:32" }, { name:"Tiểu Tuyết", day:23, time:"04:53" }],
        12:  [{ name:"Đại Tuyết", day:8, time:"00:17" }, { name:"Đông Chí", day:22, time:"18:09" }]
    },
    1980: {
        1:  [{ name:"Tiểu Hàn", day:6, time:"11:28" }, { name:"Đại Hàn", day:21, time:"04:48" }],
        2:  [{ name:"Lập Xuân", day:4, time:"23:09" }, { name:"Vũ Thủy", day:19, time:"19:01" }],
        3:  [{ name:"Kinh Trập", day:5, time:"17:16" }, { name:"Xuân Phân", day:20, time:"18:09" }],
        4:  [{ name:"Thanh Minh", day:4, time:"22:14" }, { name:"Cốc Vũ", day:20, time:"05:22" }],
        5:  [{ name:"Lập Hạ", day:5, time:"15:44" }, { name:"Tiểu Mãn", day:21, time:"04:41" }],
        6:  [{ name:"Mang Chủng", day:5, time:"20:03" }, { name:"Hạ Chí", day:21, time:"12:46" }],
        7:  [{ name:"Tiểu Thử", day:7, time:"06:23" }, { name:"Đại Thử", day:22, time:"23:41" }],
        8:  [{ name:"Lập Thu", day:7, time:"16:08" }, { name:"Xử Thử", day:23, time:"06:40" }],
        9:  [{ name:"Bạch Lộ", day:7, time:"18:53" }, { name:"Thu Phân", day:23, time:"04:08" }],
        10:  [{ name:"Hàn Lộ", day:8, time:"10:18" }, { name:"Sương Giáng", day:23, time:"13:16" }],
        11:  [{ name:"Lập Đông", day:7, time:"13:17" }, { name:"Tiểu Tuyết", day:22, time:"10:40" }],
        12:  [{ name:"Đại Tuyết", day:7, time:"06:00" }, { name:"Đông Chí", day:21, time:"23:55" }]
    },
    1981: {
        1:  [{ name:"Tiểu Hàn", day:5, time:"17:12" }, { name:"Đại Hàn", day:20, time:"10:35" }],
        2:  [{ name:"Lập Xuân", day:4, time:"04:54" }, { name:"Vũ Thủy", day:19, time:"00:51" }],
        3:  [{ name:"Kinh Trập", day:5, time:"23:04" }, { name:"Xuân Phân", day:21, time:"00:02" }],
        4:  [{ name:"Thanh Minh", day:5, time:"04:04" }, { name:"Cốc Vũ", day:20, time:"11:18" }],
        5:  [{ name:"Lập Hạ", day:5, time:"21:34" }, { name:"Tiểu Mãn", day:21, time:"10:39" }],
        6:  [{ name:"Mang Chủng", day:6, time:"01:52" }, { name:"Hạ Chí", day:21, time:"18:44" }],
        7:  [{ name:"Tiểu Thử", day:7, time:"12:11" }, { name:"Đại Thử", day:23, time:"05:39" }],
        8:  [{ name:"Lập Thu", day:7, time:"21:56" }, { name:"Xử Thử", day:23, time:"12:37" }],
        9:  [{ name:"Bạch Lộ", day:8, time:"00:42" }, { name:"Thu Phân", day:23, time:"10:04" }],
        10:  [{ name:"Hàn Lộ", day:8, time:"16:08" }, { name:"Sương Giáng", day:23, time:"19:12" }],
        11:  [{ name:"Lập Đông", day:7, time:"19:07" }, { name:"Tiểu Tuyết", day:22, time:"16:35" }],
        12:  [{ name:"Đại Tuyết", day:7, time:"11:50" }, { name:"Đông Chí", day:22, time:"05:50" }]
    },
    1982: {
        1:  [{ name:"Tiểu Hàn", day:5, time:"23:02" }, { name:"Đại Hàn", day:20, time:"16:30" }],
        2:  [{ name:"Lập Xuân", day:4, time:"10:44" }, { name:"Vũ Thủy", day:19, time:"06:45" }],
        3:  [{ name:"Kinh Trập", day:6, time:"04:53" }, { name:"Xuân Phân", day:21, time:"05:55" }],
        4:  [{ name:"Thanh Minh", day:5, time:"09:52" }, { name:"Cốc Vũ", day:20, time:"17:06" }],
        5:  [{ name:"Lập Hạ", day:6, time:"03:19" }, { name:"Tiểu Mãn", day:21, time:"16:22" }],
        6:  [{ name:"Mang Chủng", day:6, time:"07:35" }, { name:"Hạ Chí", day:22, time:"00:22" }],
        7:  [{ name:"Tiểu Thử", day:7, time:"17:54" }, { name:"Đại Thử", day:23, time:"11:15" }],
        8:  [{ name:"Lập Thu", day:8, time:"03:41" }, { name:"Xử Thử", day:23, time:"18:14" }],
        9:  [{ name:"Bạch Lộ", day:8, time:"06:31" }, { name:"Thu Phân", day:23, time:"15:45" }],
        10:  [{ name:"Hàn Lộ", day:8, time:"22:01" }, { name:"Sương Giáng", day:24, time:"00:57" }],
        11:  [{ name:"Lập Đông", day:8, time:"01:03" }, { name:"Tiểu Tuyết", day:22, time:"22:22" }],
        12:  [{ name:"Đại Tuyết", day:7, time:"17:47" }, { name:"Đông Chí", day:22, time:"11:37" }]
    },
    1983: {
        1:  [{ name:"Tiểu Hàn", day:6, time:"04:58" }, { name:"Đại Hàn", day:20, time:"22:16" }],
        2:  [{ name:"Lập Xuân", day:4, time:"16:39" }, { name:"Vũ Thủy", day:19, time:"12:30" }],
        3:  [{ name:"Kinh Trập", day:6, time:"10:46" }, { name:"Xuân Phân", day:21, time:"11:38" }],
        4:  [{ name:"Thanh Minh", day:5, time:"15:44" }, { name:"Cốc Vũ", day:20, time:"22:49" }],
        5:  [{ name:"Lập Hạ", day:6, time:"09:10" }, { name:"Tiểu Mãn", day:21, time:"22:06" }],
        6:  [{ name:"Mang Chủng", day:6, time:"13:25" }, { name:"Hạ Chí", day:22, time:"06:08" }],
        7:  [{ name:"Tiểu Thử", day:7, time:"23:42" }, { name:"Đại Thử", day:23, time:"17:03" }],
        8:  [{ name:"Lập Thu", day:8, time:"09:29" }, { name:"Xử Thử", day:24, time:"00:07" }],
        9:  [{ name:"Bạch Lộ", day:8, time:"12:19" }, { name:"Thu Phân", day:23, time:"21:41" }],
        10:  [{ name:"Hàn Lộ", day:9, time:"03:50" }, { name:"Sương Giáng", day:24, time:"06:53" }],
        11:  [{ name:"Lập Đông", day:8, time:"06:52" }, { name:"Tiểu Tuyết", day:23, time:"04:18" }],
        12:  [{ name:"Đại Tuyết", day:7, time:"23:33" }, { name:"Đông Chí", day:22, time:"17:29" }]
    },
    1984: {
        1:  [{ name:"Tiểu Hàn", day:6, time:"10:40" }, { name:"Đại Hàn", day:21, time:"04:04" }],
        2:  [{ name:"Lập Xuân", day:4, time:"22:18" }, { name:"Vũ Thủy", day:19, time:"18:15" }],
        3:  [{ name:"Kinh Trập", day:5, time:"16:24" }, { name:"Xuân Phân", day:20, time:"17:23" }],
        4:  [{ name:"Thanh Minh", day:4, time:"21:21" }, { name:"Cốc Vũ", day:20, time:"04:37" }],
        5:  [{ name:"Lập Hạ", day:5, time:"14:50" }, { name:"Tiểu Mãn", day:21, time:"03:57" }],
        6:  [{ name:"Mang Chủng", day:5, time:"19:08" }, { name:"Hạ Chí", day:21, time:"12:02" }],
        7:  [{ name:"Tiểu Thử", day:7, time:"05:29" }, { name:"Đại Thử", day:22, time:"22:58" }],
        8:  [{ name:"Lập Thu", day:7, time:"15:18" }, { name:"Xử Thử", day:23, time:"06:00" }],
        9:  [{ name:"Bạch Lộ", day:7, time:"18:09" }, { name:"Thu Phân", day:23, time:"03:32" }],
        10:  [{ name:"Hàn Lộ", day:8, time:"09:42" }, { name:"Sương Giáng", day:23, time:"12:45" }],
        11:  [{ name:"Lập Đông", day:7, time:"12:45" }, { name:"Tiểu Tuyết", day:22, time:"10:10" }],
        12:  [{ name:"Đại Tuyết", day:7, time:"05:27" }, { name:"Đông Chí", day:21, time:"23:22" }]
    },
    1985: {
        1:  [{ name:"Tiểu Hàn", day:5, time:"16:35" }, { name:"Đại Hàn", day:20, time:"09:57" }],
        2:  [{ name:"Lập Xuân", day:4, time:"04:11" }, { name:"Vũ Thủy", day:19, time:"00:07" }],
        3:  [{ name:"Kinh Trập", day:5, time:"22:16" }, { name:"Xuân Phân", day:20, time:"23:13" }],
        4:  [{ name:"Thanh Minh", day:5, time:"03:13" }, { name:"Cốc Vũ", day:20, time:"10:25" }],
        5:  [{ name:"Lập Hạ", day:5, time:"20:42" }, { name:"Tiểu Mãn", day:21, time:"09:42" }],
        6:  [{ name:"Mang Chủng", day:6, time:"00:59" }, { name:"Hạ Chí", day:21, time:"17:43" }],
        7:  [{ name:"Tiểu Thử", day:7, time:"11:18" }, { name:"Đại Thử", day:23, time:"04:36" }],
        8:  [{ name:"Lập Thu", day:7, time:"21:04" }, { name:"Xử Thử", day:23, time:"11:35" }],
        9:  [{ name:"Bạch Lộ", day:7, time:"23:52" }, { name:"Thu Phân", day:23, time:"09:07" }],
        10:  [{ name:"Hàn Lộ", day:8, time:"15:24" }, { name:"Sương Giáng", day:23, time:"18:21" }],
        11:  [{ name:"Lập Đông", day:7, time:"18:29" }, { name:"Tiểu Tuyết", day:22, time:"15:50" }],
        12:  [{ name:"Đại Tuyết", day:7, time:"11:16" }, { name:"Đông Chí", day:22, time:"05:07" }]
    },
    1986: {
        1:  [{ name:"Tiểu Hàn", day:5, time:"22:27" }, { name:"Đại Hàn", day:20, time:"15:46" }],
        2:  [{ name:"Lập Xuân", day:4, time:"10:07" }, { name:"Vũ Thủy", day:19, time:"05:57" }],
        3:  [{ name:"Kinh Trập", day:6, time:"04:11" }, { name:"Xuân Phân", day:21, time:"05:02" }],
        4:  [{ name:"Thanh Minh", day:5, time:"09:05" }, { name:"Cốc Vũ", day:20, time:"16:11" }],
        5:  [{ name:"Lập Hạ", day:6, time:"02:30" }, { name:"Tiểu Mãn", day:21, time:"15:27" }],
        6:  [{ name:"Mang Chủng", day:6, time:"06:44" }, { name:"Hạ Chí", day:21, time:"23:29" }],
        7:  [{ name:"Tiểu Thử", day:7, time:"17:00" }, { name:"Đại Thử", day:23, time:"10:24" }],
        8:  [{ name:"Lập Thu", day:8, time:"02:45" }, { name:"Xử Thử", day:23, time:"17:25" }],
        9:  [{ name:"Bạch Lộ", day:8, time:"05:34" }, { name:"Thu Phân", day:23, time:"14:58" }],
        10:  [{ name:"Hàn Lộ", day:8, time:"21:06" }, { name:"Sương Giáng", day:24, time:"00:14" }],
        11:  [{ name:"Lập Đông", day:8, time:"00:12" }, { name:"Tiểu Tuyết", day:22, time:"21:43" }],
        12:  [{ name:"Đại Tuyết", day:7, time:"17:00" }, { name:"Đông Chí", day:22, time:"11:01" }]
    },
    1987: {
        1:  [{ name:"Tiểu Hàn", day:6, time:"04:12" }, { name:"Đại Hàn", day:20, time:"21:40" }],
        2:  [{ name:"Lập Xuân", day:4, time:"15:51" }, { name:"Vũ Thủy", day:19, time:"11:49" }],
        3:  [{ name:"Kinh Trập", day:6, time:"09:53" }, { name:"Xuân Phân", day:21, time:"10:51" }],
        4:  [{ name:"Thanh Minh", day:5, time:"14:44" }, { name:"Cốc Vũ", day:20, time:"21:57" }],
        5:  [{ name:"Lập Hạ", day:6, time:"08:05" }, { name:"Tiểu Mãn", day:21, time:"21:10" }],
        6:  [{ name:"Mang Chủng", day:6, time:"12:18" }, { name:"Hạ Chí", day:22, time:"05:10" }],
        7:  [{ name:"Tiểu Thử", day:7, time:"22:38" }, { name:"Đại Thử", day:23, time:"16:06" }],
        8:  [{ name:"Lập Thu", day:8, time:"08:29" }, { name:"Xử Thử", day:23, time:"23:09" }],
        9:  [{ name:"Bạch Lộ", day:8, time:"11:23" }, { name:"Thu Phân", day:23, time:"20:44" }],
        10:  [{ name:"Hàn Lộ", day:9, time:"02:58" }, { name:"Sương Giáng", day:24, time:"06:00" }],
        11:  [{ name:"Lập Đông", day:8, time:"06:05" }, { name:"Tiểu Tuyết", day:23, time:"03:28" }],
        12:  [{ name:"Đại Tuyết", day:7, time:"22:51" }, { name:"Đông Chí", day:22, time:"16:45" }]
    },
    1988: {
        1:  [{ name:"Tiểu Hàn", day:6, time:"10:03" }, { name:"Đại Hàn", day:21, time:"03:24" }],
        2:  [{ name:"Lập Xuân", day:4, time:"21:42" }, { name:"Vũ Thủy", day:19, time:"17:35" }],
        3:  [{ name:"Kinh Trập", day:5, time:"15:46" }, { name:"Xuân Phân", day:20, time:"16:38" }],
        4:  [{ name:"Thanh Minh", day:4, time:"20:39" }, { name:"Cốc Vũ", day:20, time:"03:44" }],
        5:  [{ name:"Lập Hạ", day:5, time:"14:01" }, { name:"Tiểu Mãn", day:21, time:"02:56" }],
        6:  [{ name:"Mang Chủng", day:5, time:"18:14" }, { name:"Hạ Chí", day:21, time:"10:56" }],
        7:  [{ name:"Tiểu Thử", day:7, time:"04:32" }, { name:"Đại Thử", day:22, time:"21:50" }],
        8:  [{ name:"Lập Thu", day:7, time:"14:20" }, { name:"Xử Thử", day:23, time:"04:54" }],
        9:  [{ name:"Bạch Lộ", day:7, time:"17:11" }, { name:"Thu Phân", day:23, time:"02:28" }],
        10:  [{ name:"Hàn Lộ", day:8, time:"08:44" }, { name:"Sương Giáng", day:23, time:"11:43" }],
        11:  [{ name:"Lập Đông", day:7, time:"11:48" }, { name:"Tiểu Tuyết", day:22, time:"09:11" }],
        12:  [{ name:"Đại Tuyết", day:7, time:"04:34" }, { name:"Đông Chí", day:21, time:"22:27" }]
    },
    1989: {
        1:  [{ name:"Tiểu Hàn", day:5, time:"15:45" }, { name:"Đại Hàn", day:20, time:"09:06" }],
        2:  [{ name:"Lập Xuân", day:4, time:"03:26" }, { name:"Vũ Thủy", day:18, time:"23:20" }],
        3:  [{ name:"Kinh Trập", day:5, time:"21:33" }, { name:"Xuân Phân", day:20, time:"22:28" }],
        4:  [{ name:"Thanh Minh", day:5, time:"02:29" }, { name:"Cốc Vũ", day:20, time:"09:38" }],
        5:  [{ name:"Lập Hạ", day:5, time:"19:53" }, { name:"Tiểu Mãn", day:21, time:"08:53" }],
        6:  [{ name:"Mang Chủng", day:6, time:"00:05" }, { name:"Hạ Chí", day:21, time:"16:52" }],
        7:  [{ name:"Tiểu Thử", day:7, time:"10:19" }, { name:"Đại Thử", day:23, time:"03:45" }],
        8:  [{ name:"Lập Thu", day:7, time:"20:03" }, { name:"Xử Thử", day:23, time:"10:45" }],
        9:  [{ name:"Bạch Lộ", day:7, time:"22:53" }, { name:"Thu Phân", day:23, time:"08:19" }],
        10:  [{ name:"Hàn Lộ", day:8, time:"14:27" }, { name:"Sương Giáng", day:23, time:"17:35" }],
        11:  [{ name:"Lập Đông", day:7, time:"17:33" }, { name:"Tiểu Tuyết", day:22, time:"15:04" }],
        12:  [{ name:"Đại Tuyết", day:7, time:"10:20" }, { name:"Đông Chí", day:22, time:"04:21" }]
    },
    1990: {
        1:  [{ name:"Tiểu Hàn", day:5, time:"21:32" }, { name:"Đại Hàn", day:20, time:"15:01" }],
        2:  [{ name:"Lập Xuân", day:4, time:"09:13" }, { name:"Vũ Thủy", day:19, time:"05:13" }],
        3:  [{ name:"Kinh Trập", day:6, time:"03:18" }, { name:"Xuân Phân", day:21, time:"04:18" }],
        4:  [{ name:"Thanh Minh", day:5, time:"08:12" }, { name:"Cốc Vũ", day:20, time:"15:26" }],
        5:  [{ name:"Lập Hạ", day:6, time:"01:35" }, { name:"Tiểu Mãn", day:21, time:"14:36" }],
        6:  [{ name:"Mang Chủng", day:6, time:"05:45" }, { name:"Hạ Chí", day:21, time:"22:32" }],
        7:  [{ name:"Tiểu Thử", day:7, time:"16:00" }, { name:"Đại Thử", day:23, time:"09:21" }],
        8:  [{ name:"Lập Thu", day:8, time:"01:45" }, { name:"Xử Thử", day:23, time:"16:20" }],
        9:  [{ name:"Bạch Lộ", day:8, time:"04:36" }, { name:"Thu Phân", day:23, time:"13:55" }],
        10:  [{ name:"Hàn Lộ", day:8, time:"20:13" }, { name:"Sương Giáng", day:23, time:"23:13" }],
        11:  [{ name:"Lập Đông", day:7, time:"23:23" }, { name:"Tiểu Tuyết", day:22, time:"20:46" }],
        12:  [{ name:"Đại Tuyết", day:7, time:"16:13" }, { name:"Đông Chí", day:22, time:"10:06" }]
    },
    1991: {
        1:  [{ name:"Tiểu Hàn", day:6, time:"03:27" }, { name:"Đại Hàn", day:20, time:"20:46" }],
        2:  [{ name:"Lập Xuân", day:4, time:"15:08" }, { name:"Vũ Thủy", day:19, time:"10:58" }],
        3:  [{ name:"Kinh Trập", day:6, time:"09:12" }, { name:"Xuân Phân", day:21, time:"10:01" }],
        4:  [{ name:"Thanh Minh", day:5, time:"14:04" }, { name:"Cốc Vũ", day:20, time:"21:08" }],
        5:  [{ name:"Lập Hạ", day:6, time:"07:26" }, { name:"Tiểu Mãn", day:21, time:"20:20" }],
        6:  [{ name:"Mang Chủng", day:6, time:"11:38" }, { name:"Hạ Chí", day:22, time:"04:18" }],
        7:  [{ name:"Tiểu Thử", day:7, time:"21:52" }, { name:"Đại Thử", day:23, time:"15:10" }],
        8:  [{ name:"Lập Thu", day:8, time:"07:37" }, { name:"Xử Thử", day:23, time:"22:12" }],
        9:  [{ name:"Bạch Lộ", day:8, time:"10:27" }, { name:"Thu Phân", day:23, time:"19:47" }],
        10:  [{ name:"Hàn Lộ", day:9, time:"02:00" }, { name:"Sương Giáng", day:24, time:"05:04" }],
        11:  [{ name:"Lập Đông", day:8, time:"05:07" }, { name:"Tiểu Tuyết", day:23, time:"02:35" }],
        12:  [{ name:"Đại Tuyết", day:7, time:"21:55" }, { name:"Đông Chí", day:22, time:"15:53" }]
    },
    1992: {
        1:  [{ name:"Tiểu Hàn", day:6, time:"09:08" }, { name:"Đại Hàn", day:21, time:"02:32" }],
        2:  [{ name:"Lập Xuân", day:4, time:"20:47" }, { name:"Vũ Thủy", day:19, time:"16:43" }],
        3:  [{ name:"Kinh Trập", day:5, time:"14:51" }, { name:"Xuân Phân", day:20, time:"15:47" }],
        4:  [{ name:"Thanh Minh", day:4, time:"19:44" }, { name:"Cốc Vũ", day:20, time:"02:56" }],
        5:  [{ name:"Lập Hạ", day:5, time:"13:08" }, { name:"Tiểu Mãn", day:21, time:"02:12" }],
        6:  [{ name:"Mang Chủng", day:5, time:"17:22" }, { name:"Hạ Chí", day:21, time:"10:14" }],
        7:  [{ name:"Tiểu Thử", day:7, time:"03:40" }, { name:"Đại Thử", day:22, time:"21:08" }],
        8:  [{ name:"Lập Thu", day:7, time:"13:27" }, { name:"Xử Thử", day:23, time:"04:10" }],
        9:  [{ name:"Bạch Lộ", day:7, time:"16:18" }, { name:"Thu Phân", day:23, time:"01:42" }],
        10:  [{ name:"Hàn Lộ", day:8, time:"07:51" }, { name:"Sương Giáng", day:23, time:"10:56" }],
        11:  [{ name:"Lập Đông", day:7, time:"10:56" }, { name:"Tiểu Tuyết", day:22, time:"08:25" }],
        12:  [{ name:"Đại Tuyết", day:7, time:"03:43" }, { name:"Đông Chí", day:21, time:"21:42" }]
    },
    1993: {
        1:  [{ name:"Tiểu Hàn", day:5, time:"14:56" }, { name:"Đại Hàn", day:20, time:"08:22" }],
        2:  [{ name:"Lập Xuân", day:4, time:"02:37" }, { name:"Vũ Thủy", day:18, time:"22:35" }],
        3:  [{ name:"Kinh Trập", day:5, time:"20:42" }, { name:"Xuân Phân", day:20, time:"21:40" }],
        4:  [{ name:"Thanh Minh", day:5, time:"01:37" }, { name:"Cốc Vũ", day:20, time:"08:49" }],
        5:  [{ name:"Lập Hạ", day:5, time:"19:01" }, { name:"Tiểu Mãn", day:21, time:"08:01" }],
        6:  [{ name:"Mang Chủng", day:5, time:"23:15" }, { name:"Hạ Chí", day:21, time:"15:59" }],
        7:  [{ name:"Tiểu Thử", day:7, time:"09:32" }, { name:"Đại Thử", day:23, time:"02:50" }],
        8:  [{ name:"Lập Thu", day:7, time:"19:17" }, { name:"Xử Thử", day:23, time:"09:50" }],
        9:  [{ name:"Bạch Lộ", day:7, time:"22:07" }, { name:"Thu Phân", day:23, time:"07:22" }],
        10:  [{ name:"Hàn Lộ", day:8, time:"13:39" }, { name:"Sương Giáng", day:23, time:"16:37" }],
        11:  [{ name:"Lập Đông", day:7, time:"16:45" }, { name:"Tiểu Tuyết", day:22, time:"14:06" }],
        12:  [{ name:"Đại Tuyết", day:7, time:"09:33" }, { name:"Đông Chí", day:22, time:"03:25" }]
    },
    1994: {
        1:  [{ name:"Tiểu Hàn", day:5, time:"20:47" }, { name:"Đại Hàn", day:20, time:"14:07" }],
        2:  [{ name:"Lập Xuân", day:4, time:"08:30" }, { name:"Vũ Thủy", day:19, time:"04:21" }],
        3:  [{ name:"Kinh Trập", day:6, time:"02:37" }, { name:"Xuân Phân", day:21, time:"03:27" }],
        4:  [{ name:"Thanh Minh", day:5, time:"07:31" }, { name:"Cốc Vũ", day:20, time:"14:35" }],
        5:  [{ name:"Lập Hạ", day:6, time:"00:54" }, { name:"Tiểu Mãn", day:21, time:"13:48" }],
        6:  [{ name:"Mang Chủng", day:6, time:"05:05" }, { name:"Hạ Chí", day:21, time:"21:47" }],
        7:  [{ name:"Tiểu Thử", day:7, time:"15:19" }, { name:"Đại Thử", day:23, time:"08:41" }],
        8:  [{ name:"Lập Thu", day:8, time:"01:04" }, { name:"Xử Thử", day:23, time:"15:43" }],
        9:  [{ name:"Bạch Lộ", day:8, time:"03:55" }, { name:"Thu Phân", day:23, time:"13:19" }],
        10:  [{ name:"Hàn Lộ", day:8, time:"19:29" }, { name:"Sương Giáng", day:23, time:"22:35" }],
        11:  [{ name:"Lập Đông", day:7, time:"22:35" }, { name:"Tiểu Tuyết", day:22, time:"20:05" }],
        12:  [{ name:"Đại Tuyết", day:7, time:"15:22" }, { name:"Đông Chí", day:22, time:"09:22" }]
    },
    1995: {
        1:  [{ name:"Tiểu Hàn", day:6, time:"02:34" }, { name:"Đại Hàn", day:20, time:"20:00" }],
        2:  [{ name:"Lập Xuân", day:4, time:"14:12" }, { name:"Vũ Thủy", day:19, time:"10:10" }],
        3:  [{ name:"Kinh Trập", day:6, time:"08:16" }, { name:"Xuân Phân", day:21, time:"09:14" }],
        4:  [{ name:"Thanh Minh", day:5, time:"13:08" }, { name:"Cốc Vũ", day:20, time:"20:21" }],
        5:  [{ name:"Lập Hạ", day:6, time:"06:29" }, { name:"Tiểu Mãn", day:21, time:"19:34" }],
        6:  [{ name:"Mang Chủng", day:6, time:"10:42" }, { name:"Hạ Chí", day:22, time:"03:34" }],
        7:  [{ name:"Tiểu Thử", day:7, time:"21:00" }, { name:"Đại Thử", day:23, time:"14:29" }],
        8:  [{ name:"Lập Thu", day:8, time:"06:51" }, { name:"Xử Thử", day:23, time:"21:34" }],
        9:  [{ name:"Bạch Lộ", day:8, time:"09:48" }, { name:"Thu Phân", day:23, time:"19:12" }],
        10:  [{ name:"Hàn Lộ", day:9, time:"01:26" }, { name:"Sương Giáng", day:24, time:"04:31" }],
        11:  [{ name:"Lập Đông", day:8, time:"04:35" }, { name:"Tiểu Tuyết", day:23, time:"02:01" }],
        12:  [{ name:"Đại Tuyết", day:7, time:"21:22" }, { name:"Đông Chí", day:22, time:"15:16" }]
    },
    1996: {
        1:  [{ name:"Tiểu Hàn", day:6, time:"08:31" }, { name:"Đại Hàn", day:21, time:"01:52" }],
        2:  [{ name:"Lập Xuân", day:4, time:"20:07" }, { name:"Vũ Thủy", day:19, time:"16:00" }],
        3:  [{ name:"Kinh Trập", day:5, time:"14:09" }, { name:"Xuân Phân", day:20, time:"15:02" }],
        4:  [{ name:"Thanh Minh", day:4, time:"19:01" }, { name:"Cốc Vũ", day:20, time:"02:09" }],
        5:  [{ name:"Lập Hạ", day:5, time:"12:25" }, { name:"Tiểu Mãn", day:21, time:"01:22" }],
        6:  [{ name:"Mang Chủng", day:5, time:"16:40" }, { name:"Hạ Chí", day:21, time:"09:23" }],
        7:  [{ name:"Tiểu Thử", day:7, time:"02:59" }, { name:"Đại Thử", day:22, time:"20:18" }],
        8:  [{ name:"Lập Thu", day:7, time:"12:48" }, { name:"Xử Thử", day:23, time:"03:22" }],
        9:  [{ name:"Bạch Lộ", day:7, time:"15:42" }, { name:"Thu Phân", day:23, time:"01:00" }],
        10:  [{ name:"Hàn Lộ", day:8, time:"07:18" }, { name:"Sương Giáng", day:23, time:"10:18" }],
        11:  [{ name:"Lập Đông", day:7, time:"10:26" }, { name:"Tiểu Tuyết", day:22, time:"07:49" }],
        12:  [{ name:"Đại Tuyết", day:7, time:"03:13" }, { name:"Đông Chí", day:21, time:"21:05" }]
    },
    1997: {
        1:  [{ name:"Tiểu Hàn", day:5, time:"14:24" }, { name:"Đại Hàn", day:20, time:"07:42" }],
        2:  [{ name:"Lập Xuân", day:4, time:"02:01" }, { name:"Vũ Thủy", day:18, time:"21:51" }],
        3:  [{ name:"Kinh Trập", day:5, time:"20:03" }, { name:"Xuân Phân", day:20, time:"20:54" }],
        4:  [{ name:"Thanh Minh", day:5, time:"00:56" }, { name:"Cốc Vũ", day:20, time:"08:02" }],
        5:  [{ name:"Lập Hạ", day:5, time:"18:19" }, { name:"Tiểu Mãn", day:21, time:"07:17" }],
        6:  [{ name:"Mang Chủng", day:5, time:"22:32" }, { name:"Hạ Chí", day:21, time:"15:19" }],
        7:  [{ name:"Tiểu Thử", day:7, time:"08:49" }, { name:"Đại Thử", day:23, time:"02:15" }],
        8:  [{ name:"Lập Thu", day:7, time:"18:35" }, { name:"Xử Thử", day:23, time:"09:18" }],
        9:  [{ name:"Bạch Lộ", day:7, time:"21:28" }, { name:"Thu Phân", day:23, time:"06:55" }],
        10:  [{ name:"Hàn Lộ", day:8, time:"13:04" }, { name:"Sương Giáng", day:23, time:"16:14" }],
        11:  [{ name:"Lập Đông", day:7, time:"16:14" }, { name:"Tiểu Tuyết", day:22, time:"13:47" }],
        12:  [{ name:"Đại Tuyết", day:7, time:"09:04" }, { name:"Đông Chí", day:22, time:"03:06" }]
    },
    1998: {
        1:  [{ name:"Tiểu Hàn", day:5, time:"20:18" }, { name:"Đại Hàn", day:20, time:"13:45" }],
        2:  [{ name:"Lập Xuân", day:4, time:"07:56" }, { name:"Vũ Thủy", day:19, time:"03:54" }],
        3:  [{ name:"Kinh Trập", day:6, time:"01:56" }, { name:"Xuân Phân", day:21, time:"02:54" }],
        4:  [{ name:"Thanh Minh", day:5, time:"06:44" }, { name:"Cốc Vũ", day:20, time:"13:56" }],
        5:  [{ name:"Lập Hạ", day:6, time:"00:02" }, { name:"Tiểu Mãn", day:21, time:"13:05" }],
        6:  [{ name:"Mang Chủng", day:6, time:"04:13" }, { name:"Hạ Chí", day:21, time:"21:02" }],
        7:  [{ name:"Tiểu Thử", day:7, time:"14:30" }, { name:"Đại Thử", day:23, time:"07:55" }],
        8:  [{ name:"Lập Thu", day:8, time:"00:19" }, { name:"Xử Thử", day:23, time:"14:58" }],
        9:  [{ name:"Bạch Lộ", day:8, time:"03:15" }, { name:"Thu Phân", day:23, time:"12:37" }],
        10:  [{ name:"Hàn Lộ", day:8, time:"18:55" }, { name:"Sương Giáng", day:23, time:"21:58" }],
        11:  [{ name:"Lập Đông", day:7, time:"22:08" }, { name:"Tiểu Tuyết", day:22, time:"19:34" }],
        12:  [{ name:"Đại Tuyết", day:7, time:"15:01" }, { name:"Đông Chí", day:22, time:"08:56" }]
    },
    1999: {
        1:  [{ name:"Tiểu Hàn", day:6, time:"02:16" }, { name:"Đại Hàn", day:20, time:"19:37" }],
        2:  [{ name:"Lập Xuân", day:4, time:"13:56" }, { name:"Vũ Thủy", day:19, time:"09:46" }],
        3:  [{ name:"Kinh Trập", day:6, time:"07:57" }, { name:"Xuân Phân", day:21, time:"08:45" }],
        4:  [{ name:"Thanh Minh", day:5, time:"12:44" }, { name:"Cốc Vũ", day:20, time:"19:45" }],
        5:  [{ name:"Lập Hạ", day:6, time:"06:01" }, { name:"Tiểu Mãn", day:21, time:"18:52" }],
        6:  [{ name:"Mang Chủng", day:6, time:"10:09" }, { name:"Hạ Chí", day:22, time:"02:48" }],
        7:  [{ name:"Tiểu Thử", day:7, time:"20:24" }, { name:"Đại Thử", day:23, time:"13:43" }],
        8:  [{ name:"Lập Thu", day:8, time:"06:14" }, { name:"Xử Thử", day:23, time:"20:50" }],
        9:  [{ name:"Bạch Lộ", day:8, time:"09:09" }, { name:"Thu Phân", day:23, time:"18:31" }],
        10:  [{ name:"Hàn Lộ", day:9, time:"00:48" }, { name:"Sương Giáng", day:24, time:"03:51" }],
        11:  [{ name:"Lập Đông", day:8, time:"03:57" }, { name:"Tiểu Tuyết", day:23, time:"01:24" }],
        12:  [{ name:"Đại Tuyết", day:7, time:"20:47" }, { name:"Đông Chí", day:22, time:"14:43" }]
    },
    2000: {
        1:  [{ name:"Tiểu Hàn", day:6, time:"08:00" }, { name:"Đại Hàn", day:21, time:"01:22" }],
        2:  [{ name:"Lập Xuân", day:4, time:"19:39" }, { name:"Vũ Thủy", day:19, time:"15:33" }],
        3:  [{ name:"Kinh Trập", day:5, time:"13:42" }, { name:"Xuân Phân", day:20, time:"14:34" }],
        4:  [{ name:"Thanh Minh", day:4, time:"18:31" }, { name:"Cốc Vũ", day:20, time:"01:39" }],
        5:  [{ name:"Lập Hạ", day:5, time:"11:49" }, { name:"Tiểu Mãn", day:21, time:"00:49" }],
        6:  [{ name:"Mang Chủng", day:5, time:"15:58" }, { name:"Hạ Chí", day:21, time:"08:47" }],
        7:  [{ name:"Tiểu Thử", day:7, time:"02:13" }, { name:"Đại Thử", day:22, time:"19:42" }],
        8:  [{ name:"Lập Thu", day:7, time:"12:02" }, { name:"Xử Thử", day:23, time:"02:48" }],
        9:  [{ name:"Bạch Lộ", day:7, time:"14:58" }, { name:"Thu Phân", day:23, time:"00:27" }],
        10:  [{ name:"Hàn Lộ", day:8, time:"06:37" }, { name:"Sương Giáng", day:23, time:"09:47" }],
        11:  [{ name:"Lập Đông", day:7, time:"09:47" }, { name:"Tiểu Tuyết", day:22, time:"07:19" }],
        12:  [{ name:"Đại Tuyết", day:7, time:"02:36" }, { name:"Đông Chí", day:21, time:"20:37" }]
    },
    2001: {
        1:  [{ name:"Tiểu Hàn", day:5, time:"13:49" }, { name:"Đại Hàn", day:20, time:"07:16" }],
        2:  [{ name:"Lập Xuân", day:4, time:"01:28" }, { name:"Vũ Thủy", day:18, time:"21:27" }],
        3:  [{ name:"Kinh Trập", day:5, time:"19:32" }, { name:"Xuân Phân", day:20, time:"20:30" }],
        4:  [{ name:"Thanh Minh", day:5, time:"00:24" }, { name:"Cốc Vũ", day:20, time:"07:35" }],
        5:  [{ name:"Lập Hạ", day:5, time:"17:44" }, { name:"Tiểu Mãn", day:21, time:"06:43" }],
        6:  [{ name:"Mang Chủng", day:5, time:"21:53" }, { name:"Hạ Chí", day:21, time:"14:37" }],
        7:  [{ name:"Tiểu Thử", day:7, time:"08:06" }, { name:"Đại Thử", day:23, time:"01:26" }],
        8:  [{ name:"Lập Thu", day:7, time:"17:52" }, { name:"Xử Thử", day:23, time:"08:26" }],
        9:  [{ name:"Bạch Lộ", day:7, time:"20:45" }, { name:"Thu Phân", day:23, time:"06:04" }],
        10:  [{ name:"Hàn Lộ", day:8, time:"12:24" }, { name:"Sương Giáng", day:23, time:"15:25" }],
        11:  [{ name:"Lập Đông", day:7, time:"15:36" }, { name:"Tiểu Tuyết", day:22, time:"13:00" }],
        12:  [{ name:"Đại Tuyết", day:7, time:"08:28" }, { name:"Đông Chí", day:22, time:"02:21" }]
    },
    2002: {
        1:  [{ name:"Tiểu Hàn", day:5, time:"19:43" }, { name:"Đại Hàn", day:20, time:"13:01" }],
        2:  [{ name:"Lập Xuân", day:4, time:"07:23" }, { name:"Vũ Thủy", day:19, time:"03:12" }],
        3:  [{ name:"Kinh Trập", day:6, time:"01:27" }, { name:"Xuân Phân", day:21, time:"02:15" }],
        4:  [{ name:"Thanh Minh", day:5, time:"06:18" }, { name:"Cốc Vũ", day:20, time:"13:20" }],
        5:  [{ name:"Lập Hạ", day:5, time:"23:37" }, { name:"Tiểu Mãn", day:21, time:"12:29" }],
        6:  [{ name:"Mang Chủng", day:6, time:"03:45" }, { name:"Hạ Chí", day:21, time:"20:24" }],
        7:  [{ name:"Tiểu Thử", day:7, time:"13:56" }, { name:"Đại Thử", day:23, time:"07:14" }],
        8:  [{ name:"Lập Thu", day:7, time:"23:39" }, { name:"Xử Thử", day:23, time:"14:16" }],
        9:  [{ name:"Bạch Lộ", day:8, time:"02:30" }, { name:"Thu Phân", day:23, time:"11:55" }],
        10:  [{ name:"Hàn Lộ", day:8, time:"18:09" }, { name:"Sương Giáng", day:23, time:"21:17" }],
        11:  [{ name:"Lập Đông", day:7, time:"21:21" }, { name:"Tiểu Tuyết", day:22, time:"18:53" }],
        12:  [{ name:"Đại Tuyết", day:7, time:"14:14" }, { name:"Đông Chí", day:22, time:"08:14" }]
    },
    2003: {
        1:  [{ name:"Tiểu Hàn", day:6, time:"01:27" }, { name:"Đại Hàn", day:20, time:"18:52" }],
        2:  [{ name:"Lập Xuân", day:4, time:"13:05" }, { name:"Vũ Thủy", day:19, time:"09:00" }],
        3:  [{ name:"Kinh Trập", day:6, time:"07:05" }, { name:"Xuân Phân", day:21, time:"07:59" }],
        4:  [{ name:"Thanh Minh", day:5, time:"11:52" }, { name:"Cốc Vũ", day:20, time:"19:02" }],
        5:  [{ name:"Lập Hạ", day:6, time:"05:10" }, { name:"Tiểu Mãn", day:21, time:"18:12" }],
        6:  [{ name:"Mang Chủng", day:6, time:"09:19" }, { name:"Hạ Chí", day:22, time:"02:10" }],
        7:  [{ name:"Tiểu Thử", day:7, time:"19:35" }, { name:"Đại Thử", day:23, time:"13:03" }],
        8:  [{ name:"Lập Thu", day:8, time:"05:23" }, { name:"Xử Thử", day:23, time:"20:07" }],
        9:  [{ name:"Bạch Lộ", day:8, time:"08:19" }, { name:"Thu Phân", day:23, time:"17:46" }],
        10:  [{ name:"Hàn Lộ", day:9, time:"00:00" }, { name:"Sương Giáng", day:24, time:"03:08" }],
        11:  [{ name:"Lập Đông", day:8, time:"03:12" }, { name:"Tiểu Tuyết", day:23, time:"00:42" }],
        12:  [{ name:"Đại Tuyết", day:7, time:"20:04" }, { name:"Đông Chí", day:22, time:"14:03" }]
    },
    2004: {
        1:  [{ name:"Tiểu Hàn", day:6, time:"07:18" }, { name:"Đại Hàn", day:21, time:"00:42" }],
        2:  [{ name:"Lập Xuân", day:4, time:"18:55" }, { name:"Vũ Thủy", day:19, time:"14:49" }],
        3:  [{ name:"Kinh Trập", day:5, time:"12:55" }, { name:"Xuân Phân", day:20, time:"13:48" }],
        4:  [{ name:"Thanh Minh", day:4, time:"17:43" }, { name:"Cốc Vũ", day:20, time:"00:50" }],
        5:  [{ name:"Lập Hạ", day:5, time:"11:02" }, { name:"Tiểu Mãn", day:20, time:"23:58" }],
        6:  [{ name:"Mang Chủng", day:5, time:"15:13" }, { name:"Hạ Chí", day:21, time:"07:56" }],
        7:  [{ name:"Tiểu Thử", day:7, time:"01:31" }, { name:"Đại Thử", day:22, time:"18:50" }],
        8:  [{ name:"Lập Thu", day:7, time:"11:19" }, { name:"Xử Thử", day:23, time:"01:53" }],
        9:  [{ name:"Bạch Lộ", day:7, time:"14:12" }, { name:"Thu Phân", day:22, time:"23:29" }],
        10:  [{ name:"Hàn Lộ", day:8, time:"05:49" }, { name:"Sương Giáng", day:23, time:"08:48" }],
        11:  [{ name:"Lập Đông", day:7, time:"08:58" }, { name:"Tiểu Tuyết", day:22, time:"06:21" }],
        12:  [{ name:"Đại Tuyết", day:7, time:"01:48" }, { name:"Đông Chí", day:21, time:"19:41" }]
    },
    2005: {
        1:  [{ name:"Tiểu Hàn", day:5, time:"13:02" }, { name:"Đại Hàn", day:20, time:"06:21" }],
        2:  [{ name:"Lập Xuân", day:4, time:"00:42" }, { name:"Vũ Thủy", day:18, time:"20:31" }],
        3:  [{ name:"Kinh Trập", day:5, time:"18:44" }, { name:"Xuân Phân", day:20, time:"19:33" }],
        4:  [{ name:"Thanh Minh", day:4, time:"23:33" }, { name:"Cốc Vũ", day:20, time:"06:37" }],
        5:  [{ name:"Lập Hạ", day:5, time:"16:52" }, { name:"Tiểu Mãn", day:21, time:"05:47" }],
        6:  [{ name:"Mang Chủng", day:5, time:"21:01" }, { name:"Hạ Chí", day:21, time:"13:45" }],
        7:  [{ name:"Tiểu Thử", day:7, time:"07:16" }, { name:"Đại Thử", day:23, time:"00:40" }],
        8:  [{ name:"Lập Thu", day:7, time:"17:02" }, { name:"Xử Thử", day:23, time:"07:44" }],
        9:  [{ name:"Bạch Lộ", day:7, time:"19:55" }, { name:"Thu Phân", day:23, time:"05:22" }],
        10:  [{ name:"Hàn Lộ", day:8, time:"11:32" }, { name:"Sương Giáng", day:23, time:"14:41" }],
        11:  [{ name:"Lập Đông", day:7, time:"14:41" }, { name:"Tiểu Tuyết", day:22, time:"12:14" }],
        12:  [{ name:"Đại Tuyết", day:7, time:"07:32" }, { name:"Đông Chí", day:22, time:"01:34" }]
    },
    2006: {
        1:  [{ name:"Tiểu Hàn", day:5, time:"18:46" }, { name:"Đại Hàn", day:20, time:"12:14" }],
        2:  [{ name:"Lập Xuân", day:4, time:"06:26" }, { name:"Vũ Thủy", day:19, time:"02:24" }],
        3:  [{ name:"Kinh Trập", day:6, time:"00:27" }, { name:"Xuân Phân", day:21, time:"01:24" }],
        4:  [{ name:"Thanh Minh", day:5, time:"05:14" }, { name:"Cốc Vũ", day:20, time:"12:25" }],
        5:  [{ name:"Lập Hạ", day:5, time:"22:30" }, { name:"Tiểu Mãn", day:21, time:"11:31" }],
        6:  [{ name:"Mang Chủng", day:6, time:"02:36" }, { name:"Hạ Chí", day:21, time:"19:25" }],
        7:  [{ name:"Tiểu Thử", day:7, time:"12:50" }, { name:"Đại Thử", day:23, time:"06:17" }],
        8:  [{ name:"Lập Thu", day:7, time:"22:40" }, { name:"Xử Thử", day:23, time:"13:22" }],
        9:  [{ name:"Bạch Lộ", day:8, time:"01:38" }, { name:"Thu Phân", day:23, time:"11:03" }],
        10:  [{ name:"Hàn Lộ", day:8, time:"17:20" }, { name:"Sương Giáng", day:23, time:"20:26" }],
        11:  [{ name:"Lập Đông", day:7, time:"20:34" }, { name:"Tiểu Tuyết", day:22, time:"18:01" }],
        12:  [{ name:"Đại Tuyết", day:7, time:"13:26" }, { name:"Đông Chí", day:22, time:"07:21" }]
    },
    2007: {
        1:  [{ name:"Tiểu Hàn", day:6, time:"00:39" }, { name:"Đại Hàn", day:20, time:"18:00" }],
        2:  [{ name:"Lập Xuân", day:4, time:"12:17" }, { name:"Vũ Thủy", day:19, time:"08:08" }],
        3:  [{ name:"Kinh Trập", day:6, time:"06:17" }, { name:"Xuân Phân", day:21, time:"07:06" }],
        4:  [{ name:"Thanh Minh", day:5, time:"11:04" }, { name:"Cốc Vũ", day:20, time:"18:06" }],
        5:  [{ name:"Lập Hạ", day:6, time:"04:20" }, { name:"Tiểu Mãn", day:21, time:"17:11" }],
        6:  [{ name:"Mang Chủng", day:6, time:"08:26" }, { name:"Hạ Chí", day:22, time:"01:05" }],
        7:  [{ name:"Tiểu Thử", day:7, time:"18:41" }, { name:"Đại Thử", day:23, time:"11:59" }],
        8:  [{ name:"Lập Thu", day:8, time:"04:30" }, { name:"Xử Thử", day:23, time:"19:07" }],
        9:  [{ name:"Bạch Lộ", day:8, time:"07:29" }, { name:"Thu Phân", day:23, time:"16:50" }],
        10:  [{ name:"Hàn Lộ", day:8, time:"23:11" }, { name:"Sương Giáng", day:24, time:"02:14" }],
        11:  [{ name:"Lập Đông", day:8, time:"02:23" }, { name:"Tiểu Tuyết", day:22, time:"23:49" }],
        12:  [{ name:"Đại Tuyết", day:7, time:"19:13" }, { name:"Đông Chí", day:22, time:"13:06" }]
    },
    2008: {
        1:  [{ name:"Tiểu Hàn", day:6, time:"06:24" }, { name:"Đại Hàn", day:20, time:"23:42" }],
        2:  [{ name:"Lập Xuân", day:4, time:"17:59" }, { name:"Vũ Thủy", day:19, time:"13:49" }],
        3:  [{ name:"Kinh Trập", day:5, time:"11:58" }, { name:"Xuân Phân", day:20, time:"12:47" }],
        4:  [{ name:"Thanh Minh", day:4, time:"16:45" }, { name:"Cốc Vũ", day:19, time:"23:50" }],
        5:  [{ name:"Lập Hạ", day:5, time:"10:02" }, { name:"Tiểu Mãn", day:20, time:"23:00" }],
        6:  [{ name:"Mang Chủng", day:5, time:"14:11" }, { name:"Hạ Chí", day:21, time:"06:59" }],
        7:  [{ name:"Tiểu Thử", day:7, time:"00:26" }, { name:"Đại Thử", day:22, time:"17:54" }],
        8:  [{ name:"Lập Thu", day:7, time:"10:15" }, { name:"Xử Thử", day:23, time:"01:01" }],
        9:  [{ name:"Bạch Lộ", day:7, time:"13:13" }, { name:"Thu Phân", day:22, time:"22:44" }],
        10:  [{ name:"Hàn Lộ", day:8, time:"04:56" }, { name:"Sương Giáng", day:23, time:"08:08" }],
        11:  [{ name:"Lập Đông", day:7, time:"08:10" }, { name:"Tiểu Tuyết", day:22, time:"05:43" }],
        12:  [{ name:"Đại Tuyết", day:7, time:"01:01" }, { name:"Đông Chí", day:21, time:"19:03" }]
    },
    2009: {
        1:  [{ name:"Tiểu Hàn", day:5, time:"12:13" }, { name:"Đại Hàn", day:20, time:"05:39" }],
        2:  [{ name:"Lập Xuân", day:3, time:"23:49" }, { name:"Vũ Thủy", day:18, time:"19:45" }],
        3:  [{ name:"Kinh Trập", day:5, time:"17:47" }, { name:"Xuân Phân", day:20, time:"18:43" }],
        4:  [{ name:"Thanh Minh", day:4, time:"22:33" }, { name:"Cốc Vũ", day:20, time:"05:44" }],
        5:  [{ name:"Lập Hạ", day:5, time:"15:50" }, { name:"Tiểu Mãn", day:21, time:"04:50" }],
        6:  [{ name:"Mang Chủng", day:5, time:"19:58" }, { name:"Hạ Chí", day:21, time:"12:45" }],
        7:  [{ name:"Tiểu Thử", day:7, time:"06:13" }, { name:"Đại Thử", day:22, time:"23:35" }],
        8:  [{ name:"Lập Thu", day:7, time:"16:00" }, { name:"Xử Thử", day:23, time:"06:38" }],
        9:  [{ name:"Bạch Lộ", day:7, time:"18:57" }, { name:"Thu Phân", day:23, time:"04:18" }],
        10:  [{ name:"Hàn Lộ", day:8, time:"10:39" }, { name:"Sương Giáng", day:23, time:"13:43" }],
        11:  [{ name:"Lập Đông", day:7, time:"13:55" }, { name:"Tiểu Tuyết", day:22, time:"11:22" }],
        12:  [{ name:"Đại Tuyết", day:7, time:"06:51" }, { name:"Đông Chí", day:22, time:"00:46" }]
    },
    2010: {
        1:  [{ name:"Tiểu Hàn", day:5, time:"18:08" }, { name:"Đại Hàn", day:20, time:"11:27" }],
        2:  [{ name:"Lập Xuân", day:4, time:"05:47" }, { name:"Vũ Thủy", day:19, time:"01:34" }],
        3:  [{ name:"Kinh Trập", day:5, time:"23:45" }, { name:"Xuân Phân", day:21, time:"00:31" }],
        4:  [{ name:"Thanh Minh", day:5, time:"04:30" }, { name:"Cốc Vũ", day:20, time:"11:29" }],
        5:  [{ name:"Lập Hạ", day:5, time:"21:43" }, { name:"Tiểu Mãn", day:21, time:"10:33" }],
        6:  [{ name:"Mang Chủng", day:6, time:"01:49" }, { name:"Hạ Chí", day:21, time:"18:28" }],
        7:  [{ name:"Tiểu Thử", day:7, time:"12:02" }, { name:"Đại Thử", day:23, time:"05:20" }],
        8:  [{ name:"Lập Thu", day:7, time:"21:48" }, { name:"Xử Thử", day:23, time:"12:26" }],
        9:  [{ name:"Bạch Lộ", day:8, time:"00:44" }, { name:"Thu Phân", day:23, time:"10:08" }],
        10:  [{ name:"Hàn Lộ", day:8, time:"16:26" }, { name:"Sương Giáng", day:23, time:"19:34" }],
        11:  [{ name:"Lập Đông", day:7, time:"19:42" }, { name:"Tiểu Tuyết", day:22, time:"17:14" }],
        12:  [{ name:"Đại Tuyết", day:7, time:"12:38" }, { name:"Đông Chí", day:22, time:"06:37" }]
    },
    2011: {
        1:  [{ name:"Tiểu Hàn", day:5, time:"23:54" }, { name:"Đại Hàn", day:20, time:"17:18" }],
        2:  [{ name:"Lập Xuân", day:4, time:"11:32" }, { name:"Vũ Thủy", day:19, time:"07:24" }],
        3:  [{ name:"Kinh Trập", day:6, time:"05:29" }, { name:"Xuân Phân", day:21, time:"06:20" }],
        4:  [{ name:"Thanh Minh", day:5, time:"10:11" }, { name:"Cốc Vũ", day:20, time:"17:16" }],
        5:  [{ name:"Lập Hạ", day:6, time:"03:22" }, { name:"Tiểu Mãn", day:21, time:"16:20" }],
        6:  [{ name:"Mang Chủng", day:6, time:"07:26" }, { name:"Hạ Chí", day:22, time:"00:15" }],
        7:  [{ name:"Tiểu Thử", day:7, time:"17:41" }, { name:"Đại Thử", day:23, time:"11:11" }],
        8:  [{ name:"Lập Thu", day:8, time:"03:32" }, { name:"Xử Thử", day:23, time:"18:20" }],
        9:  [{ name:"Bạch Lộ", day:8, time:"06:33" }, { name:"Thu Phân", day:23, time:"16:04" }],
        10:  [{ name:"Hàn Lộ", day:8, time:"22:18" }, { name:"Sương Giáng", day:24, time:"01:29" }],
        11:  [{ name:"Lập Đông", day:8, time:"01:34" }, { name:"Tiểu Tuyết", day:22, time:"23:07" }],
        12:  [{ name:"Đại Tuyết", day:7, time:"18:28" }, { name:"Đông Chí", day:22, time:"12:29" }]
    },
    2012: {
        1:  [{ name:"Tiểu Hàn", day:6, time:"05:43" }, { name:"Đại Hàn", day:20, time:"23:09" }],
        2:  [{ name:"Lập Xuân", day:4, time:"17:21" }, { name:"Vũ Thủy", day:19, time:"13:17" }],
        3:  [{ name:"Kinh Trập", day:5, time:"11:20" }, { name:"Xuân Phân", day:20, time:"12:13" }],
        4:  [{ name:"Thanh Minh", day:4, time:"16:05" }, { name:"Cốc Vũ", day:19, time:"23:11" }],
        5:  [{ name:"Lập Hạ", day:5, time:"09:19" }, { name:"Tiểu Mãn", day:20, time:"22:14" }],
        6:  [{ name:"Mang Chủng", day:5, time:"13:25" }, { name:"Hạ Chí", day:21, time:"06:08" }],
        7:  [{ name:"Tiểu Thử", day:6, time:"23:40" }, { name:"Đại Thử", day:22, time:"17:00" }],
        8:  [{ name:"Lập Thu", day:7, time:"09:30" }, { name:"Xử Thử", day:23, time:"00:06" }],
        9:  [{ name:"Bạch Lộ", day:7, time:"12:28" }, { name:"Thu Phân", day:22, time:"21:48" }],
        10:  [{ name:"Hàn Lộ", day:8, time:"04:11" }, { name:"Sương Giáng", day:23, time:"07:13" }],
        11:  [{ name:"Lập Đông", day:7, time:"07:25" }, { name:"Tiểu Tuyết", day:22, time:"04:49" }],
        12:  [{ name:"Đại Tuyết", day:7, time:"00:18" }, { name:"Đông Chí", day:21, time:"18:11" }]
    },
    2013: {
        1:  [{ name:"Tiểu Hàn", day:5, time:"11:33" }, { name:"Đại Hàn", day:20, time:"04:51" }],
        2:  [{ name:"Lập Xuân", day:3, time:"23:12" }, { name:"Vũ Thủy", day:18, time:"19:00" }],
        3:  [{ name:"Kinh Trập", day:5, time:"17:14" }, { name:"Xuân Phân", day:20, time:"18:01" }],
        4:  [{ name:"Thanh Minh", day:4, time:"22:01" }, { name:"Cốc Vũ", day:20, time:"05:02" }],
        5:  [{ name:"Lập Hạ", day:5, time:"15:17" }, { name:"Tiểu Mãn", day:21, time:"04:09" }],
        6:  [{ name:"Mang Chủng", day:5, time:"19:22" }, { name:"Hạ Chí", day:21, time:"12:03" }],
        7:  [{ name:"Tiểu Thử", day:7, time:"05:34" }, { name:"Đại Thử", day:22, time:"22:55" }],
        8:  [{ name:"Lập Thu", day:7, time:"15:19" }, { name:"Xử Thử", day:23, time:"06:00" }],
        9:  [{ name:"Bạch Lộ", day:7, time:"18:15" }, { name:"Thu Phân", day:23, time:"03:43" }],
        10:  [{ name:"Hàn Lộ", day:8, time:"09:57" }, { name:"Sương Giáng", day:23, time:"13:09" }],
        11:  [{ name:"Lập Đông", day:7, time:"13:13" }, { name:"Tiểu Tuyết", day:22, time:"10:47" }],
        12:  [{ name:"Đại Tuyết", day:7, time:"06:08" }, { name:"Đông Chí", day:22, time:"00:10" }]
    },
    2014: {
        1:  [{ name:"Tiểu Hàn", day:5, time:"17:23" }, { name:"Đại Hàn", day:20, time:"10:50" }],
        2:  [{ name:"Lập Xuân", day:4, time:"05:02" }, { name:"Vũ Thủy", day:19, time:"00:58" }],
        3:  [{ name:"Kinh Trập", day:5, time:"23:01" }, { name:"Xuân Phân", day:20, time:"23:56" }],
        4:  [{ name:"Thanh Minh", day:5, time:"03:45" }, { name:"Cốc Vũ", day:20, time:"10:55" }],
        5:  [{ name:"Lập Hạ", day:5, time:"20:58" }, { name:"Tiểu Mãn", day:21, time:"09:58" }],
        6:  [{ name:"Mang Chủng", day:6, time:"01:02" }, { name:"Hạ Chí", day:21, time:"17:51" }],
        7:  [{ name:"Tiểu Thử", day:7, time:"11:14" }, { name:"Đại Thử", day:23, time:"04:41" }],
        8:  [{ name:"Lập Thu", day:7, time:"21:02" }, { name:"Xử Thử", day:23, time:"11:45" }],
        9:  [{ name:"Bạch Lộ", day:8, time:"00:00" }, { name:"Thu Phân", day:23, time:"09:28" }],
        10:  [{ name:"Hàn Lộ", day:8, time:"15:46" }, { name:"Sương Giáng", day:23, time:"18:56" }],
        11:  [{ name:"Lập Đông", day:7, time:"19:06" }, { name:"Tiểu Tuyết", day:22, time:"16:37" }],
        12:  [{ name:"Đại Tuyết", day:7, time:"12:03" }, { name:"Đông Chí", day:22, time:"06:02" }]
    },
    2015: {
        1:  [{ name:"Tiểu Hàn", day:5, time:"23:20" }, { name:"Đại Hàn", day:20, time:"16:42" }],
        2:  [{ name:"Lập Xuân", day:4, time:"10:58" }, { name:"Vũ Thủy", day:19, time:"06:49" }],
        3:  [{ name:"Kinh Trập", day:6, time:"04:55" }, { name:"Xuân Phân", day:21, time:"05:44" }],
        4:  [{ name:"Thanh Minh", day:5, time:"09:38" }, { name:"Cốc Vũ", day:20, time:"16:41" }],
        5:  [{ name:"Lập Hạ", day:6, time:"02:52" }, { name:"Tiểu Mãn", day:21, time:"15:44" }],
        6:  [{ name:"Mang Chủng", day:6, time:"06:57" }, { name:"Hạ Chí", day:21, time:"23:37" }],
        7:  [{ name:"Tiểu Thử", day:7, time:"17:11" }, { name:"Đại Thử", day:23, time:"10:29" }],
        8:  [{ name:"Lập Thu", day:8, time:"03:00" }, { name:"Xử Thử", day:23, time:"17:36" }],
        9:  [{ name:"Bạch Lộ", day:8, time:"05:59" }, { name:"Thu Phân", day:23, time:"15:20" }],
        10:  [{ name:"Hàn Lộ", day:8, time:"21:42" }, { name:"Sương Giáng", day:24, time:"00:46" }],
        11:  [{ name:"Lập Đông", day:8, time:"00:58" }, { name:"Tiểu Tuyết", day:22, time:"22:24" }],
        12:  [{ name:"Đại Tuyết", day:7, time:"17:52" }, { name:"Đông Chí", day:22, time:"11:47" }]
    },
    2016: {
        1:  [{ name:"Tiểu Hàn", day:6, time:"05:07" }, { name:"Đại Hàn", day:20, time:"22:26" }],
        2:  [{ name:"Lập Xuân", day:4, time:"16:45" }, { name:"Vũ Thủy", day:19, time:"12:33" }],
        3:  [{ name:"Kinh Trập", day:5, time:"10:42" }, { name:"Xuân Phân", day:20, time:"11:29" }],
        4:  [{ name:"Thanh Minh", day:4, time:"15:26" }, { name:"Cốc Vũ", day:19, time:"22:28" }],
        5:  [{ name:"Lập Hạ", day:5, time:"08:41" }, { name:"Tiểu Mãn", day:20, time:"21:35" }],
        6:  [{ name:"Mang Chủng", day:5, time:"12:48" }, { name:"Hạ Chí", day:21, time:"05:34" }],
        7:  [{ name:"Tiểu Thử", day:6, time:"23:03" }, { name:"Đại Thử", day:22, time:"16:30" }],
        8:  [{ name:"Lập Thu", day:7, time:"08:52" }, { name:"Xử Thử", day:22, time:"23:38" }],
        9:  [{ name:"Bạch Lộ", day:7, time:"11:50" }, { name:"Thu Phân", day:22, time:"21:20" }],
        10:  [{ name:"Hàn Lộ", day:8, time:"03:32" }, { name:"Sương Giáng", day:23, time:"06:44" }],
        11:  [{ name:"Lập Đông", day:7, time:"06:47" }, { name:"Tiểu Tuyết", day:22, time:"04:21" }],
        12:  [{ name:"Đại Tuyết", day:6, time:"23:40" }, { name:"Đông Chí", day:21, time:"17:43" }]
    },
    2017: {
        1:  [{ name:"Tiểu Hàn", day:5, time:"10:55" }, { name:"Đại Hàn", day:20, time:"04:23" }],
        2:  [{ name:"Lập Xuân", day:3, time:"22:33" }, { name:"Vũ Thủy", day:18, time:"18:30" }],
        3:  [{ name:"Kinh Trập", day:5, time:"16:32" }, { name:"Xuân Phân", day:20, time:"17:28" }],
        4:  [{ name:"Thanh Minh", day:4, time:"21:16" }, { name:"Cốc Vũ", day:20, time:"04:26" }],
        5:  [{ name:"Lập Hạ", day:5, time:"14:30" }, { name:"Tiểu Mãn", day:21, time:"03:30" }],
        6:  [{ name:"Mang Chủng", day:5, time:"18:36" }, { name:"Hạ Chí", day:21, time:"11:23" }],
        7:  [{ name:"Tiểu Thử", day:7, time:"04:49" }, { name:"Đại Thử", day:22, time:"22:14" }],
        8:  [{ name:"Lập Thu", day:7, time:"14:39" }, { name:"Xử Thử", day:23, time:"05:19" }],
        9:  [{ name:"Bạch Lộ", day:7, time:"17:37" }, { name:"Thu Phân", day:23, time:"03:01" }],
        10:  [{ name:"Hàn Lộ", day:8, time:"09:21" }, { name:"Sương Giáng", day:23, time:"12:25" }],
        11:  [{ name:"Lập Đông", day:7, time:"12:36" }, { name:"Tiểu Tuyết", day:22, time:"10:03" }],
        12:  [{ name:"Đại Tuyết", day:7, time:"05:31" }, { name:"Đông Chí", day:21, time:"23:27" }]
    },
    2018: {
        1:  [{ name:"Tiểu Hàn", day:5, time:"16:48" }, { name:"Đại Hàn", day:20, time:"10:08" }],
        2:  [{ name:"Lập Xuân", day:4, time:"04:28" }, { name:"Vũ Thủy", day:19, time:"00:17" }],
        3:  [{ name:"Kinh Trập", day:5, time:"22:27" }, { name:"Xuân Phân", day:20, time:"23:14" }],
        4:  [{ name:"Thanh Minh", day:5, time:"03:12" }, { name:"Cốc Vũ", day:20, time:"10:11" }],
        5:  [{ name:"Lập Hạ", day:5, time:"20:24" }, { name:"Tiểu Mãn", day:21, time:"09:14" }],
        6:  [{ name:"Mang Chủng", day:6, time:"00:28" }, { name:"Hạ Chí", day:21, time:"17:06" }],
        7:  [{ name:"Tiểu Thử", day:7, time:"10:41" }, { name:"Đại Thử", day:23, time:"03:59" }],
        8:  [{ name:"Lập Thu", day:7, time:"20:29" }, { name:"Xử Thử", day:23, time:"11:07" }],
        9:  [{ name:"Bạch Lộ", day:7, time:"23:29" }, { name:"Thu Phân", day:23, time:"08:53" }],
        10:  [{ name:"Hàn Lộ", day:8, time:"15:14" }, { name:"Sương Giáng", day:23, time:"18:21" }],
        11:  [{ name:"Lập Đông", day:7, time:"18:30" }, { name:"Tiểu Tuyết", day:22, time:"16:00" }],
        12:  [{ name:"Đại Tuyết", day:7, time:"11:24" }, { name:"Đông Chí", day:22, time:"05:21" }]
    },
    2019: {
        1:  [{ name:"Tiểu Hàn", day:5, time:"22:38" }, { name:"Đại Hàn", day:20, time:"15:58" }],
        2:  [{ name:"Lập Xuân", day:4, time:"10:13" }, { name:"Vũ Thủy", day:19, time:"06:03" }],
        3:  [{ name:"Kinh Trập", day:6, time:"04:09" }, { name:"Xuân Phân", day:21, time:"04:58" }],
        4:  [{ name:"Thanh Minh", day:5, time:"08:50" }, { name:"Cốc Vũ", day:20, time:"15:54" }],
        5:  [{ name:"Lập Hạ", day:6, time:"02:01" }, { name:"Tiểu Mãn", day:21, time:"14:58" }],
        6:  [{ name:"Mang Chủng", day:6, time:"06:05" }, { name:"Hạ Chí", day:21, time:"22:53" }],
        7:  [{ name:"Tiểu Thử", day:7, time:"16:20" }, { name:"Đại Thử", day:23, time:"09:49" }],
        8:  [{ name:"Lập Thu", day:8, time:"02:12" }, { name:"Xử Thử", day:23, time:"17:01" }],
        9:  [{ name:"Bạch Lộ", day:8, time:"05:16" }, { name:"Thu Phân", day:23, time:"14:49" }],
        10:  [{ name:"Hàn Lộ", day:8, time:"21:04" }, { name:"Sương Giáng", day:24, time:"00:18" }],
        11:  [{ name:"Lập Đông", day:8, time:"00:23" }, { name:"Tiểu Tuyết", day:22, time:"21:57" }],
        12:  [{ name:"Đại Tuyết", day:7, time:"17:17" }, { name:"Đông Chí", day:22, time:"11:18" }]
    },
    2020: {
        1:  [{ name:"Tiểu Hàn", day:6, time:"04:29" }, { name:"Đại Hàn", day:20, time:"21:53" }],
        2:  [{ name:"Lập Xuân", day:4, time:"16:02" }, { name:"Vũ Thủy", day:19, time:"11:56" }],
        3:  [{ name:"Kinh Trập", day:5, time:"09:56" }, { name:"Xuân Phân", day:20, time:"10:49" }],
        4:  [{ name:"Thanh Minh", day:4, time:"14:37" }, { name:"Cốc Vũ", day:19, time:"21:45" }],
        5:  [{ name:"Lập Hạ", day:5, time:"07:51" }, { name:"Tiểu Mãn", day:20, time:"20:48" }],
        6:  [{ name:"Mang Chủng", day:5, time:"11:57" }, { name:"Hạ Chí", day:21, time:"04:43" }],
        7:  [{ name:"Tiểu Thử", day:6, time:"22:14" }, { name:"Đại Thử", day:22, time:"15:35" }],
        8:  [{ name:"Lập Thu", day:7, time:"08:05" }, { name:"Xử Thử", day:22, time:"22:43" }],
        9:  [{ name:"Bạch Lộ", day:7, time:"11:06" }, { name:"Thu Phân", day:22, time:"20:29" }],
        10:  [{ name:"Hàn Lộ", day:8, time:"02:54" }, { name:"Sương Giáng", day:23, time:"05:58" }],
        11:  [{ name:"Lập Đông", day:7, time:"06:12" }, { name:"Tiểu Tuyết", day:22, time:"03:38" }],
        12:  [{ name:"Đại Tuyết", day:6, time:"23:08" }, { name:"Đông Chí", day:21, time:"17:01" }]
    },
    2021: {
        1:  [{ name:"Tiểu Hàn", day:5, time:"10:22" }, { name:"Đại Hàn", day:20, time:"03:38" }],
        2:  [{ name:"Lập Xuân", day:3, time:"21:57" }, { name:"Vũ Thủy", day:18, time:"17:42" }],
        3:  [{ name:"Kinh Trập", day:5, time:"15:52" }, { name:"Xuân Phân", day:20, time:"16:36" }],
        4:  [{ name:"Thanh Minh", day:4, time:"20:33" }, { name:"Cốc Vũ", day:20, time:"03:32" }],
        5:  [{ name:"Lập Hạ", day:5, time:"13:46" }, { name:"Tiểu Mãn", day:21, time:"02:35" }],
        6:  [{ name:"Mang Chủng", day:5, time:"17:50" }, { name:"Hạ Chí", day:21, time:"10:30" }],
        7:  [{ name:"Tiểu Thử", day:7, time:"04:04" }, { name:"Đại Thử", day:22, time:"21:25" }],
        8:  [{ name:"Lập Thu", day:7, time:"13:52" }, { name:"Xử Thử", day:23, time:"04:33" }],
        9:  [{ name:"Bạch Lộ", day:7, time:"16:51" }, { name:"Thu Phân", day:23, time:"02:19" }],
        10:  [{ name:"Hàn Lộ", day:8, time:"08:37" }, { name:"Sương Giáng", day:23, time:"11:49" }],
        11:  [{ name:"Lập Đông", day:7, time:"11:57" }, { name:"Tiểu Tuyết", day:22, time:"09:32" }],
        12:  [{ name:"Đại Tuyết", day:7, time:"04:55" }, { name:"Đông Chí", day:21, time:"22:58" }]
    },
    2022: {
        1:  [{ name:"Tiểu Hàn", day:5, time:"16:12" }, { name:"Đại Hàn", day:20, time:"09:37" }],
        2:  [{ name:"Lập Xuân", day:4, time:"03:49" }, { name:"Vũ Thủy", day:18, time:"23:41" }],
        3:  [{ name:"Kinh Trập", day:5, time:"21:42" }, { name:"Xuân Phân", day:20, time:"22:32" }],
        4:  [{ name:"Thanh Minh", day:5, time:"02:18" }, { name:"Cốc Vũ", day:20, time:"09:22" }],
        5:  [{ name:"Lập Hạ", day:5, time:"19:24" }, { name:"Tiểu Mãn", day:21, time:"08:21" }],
        6:  [{ name:"Mang Chủng", day:5, time:"23:24" }, { name:"Hạ Chí", day:21, time:"16:12" }],
        7:  [{ name:"Tiểu Thử", day:7, time:"09:36" }, { name:"Đại Thử", day:23, time:"03:05" }],
        8:  [{ name:"Lập Thu", day:7, time:"19:27" }, { name:"Xử Thử", day:23, time:"10:15" }],
        9:  [{ name:"Bạch Lộ", day:7, time:"22:31" }, { name:"Thu Phân", day:23, time:"08:02" }],
        10:  [{ name:"Hàn Lộ", day:8, time:"14:21" }, { name:"Sương Giáng", day:23, time:"17:34" }],
        11:  [{ name:"Lập Đông", day:7, time:"17:44" }, { name:"Tiểu Tuyết", day:22, time:"15:19" }],
        12:  [{ name:"Đại Tuyết", day:7, time:"10:44" }, { name:"Đông Chí", day:22, time:"04:46" }]
    },
    2023: {
        1:  [{ name:"Tiểu Hàn", day:5, time:"22:03" }, { name:"Đại Hàn", day:20, time:"15:27" }],
        2:  [{ name:"Lập Xuân", day:4, time:"09:41" }, { name:"Vũ Thủy", day:19, time:"05:33" }],
        3:  [{ name:"Kinh Trập", day:6, time:"03:35" }, { name:"Xuân Phân", day:21, time:"04:23" }],
        4:  [{ name:"Thanh Minh", day:5, time:"08:12" }, { name:"Cốc Vũ", day:20, time:"15:12" }],
        5:  [{ name:"Lập Hạ", day:6, time:"01:17" }, { name:"Tiểu Mãn", day:21, time:"14:07" }],
        6:  [{ name:"Mang Chủng", day:6, time:"05:16" }, { name:"Hạ Chí", day:21, time:"21:56" }],
        7:  [{ name:"Tiểu Thử", day:7, time:"15:29" }, { name:"Đại Thử", day:23, time:"08:49" }],
        8:  [{ name:"Lập Thu", day:8, time:"01:21" }, { name:"Xử Thử", day:23, time:"15:59" }],
        9:  [{ name:"Bạch Lộ", day:8, time:"04:25" }, { name:"Thu Phân", day:23, time:"13:48" }],
        10:  [{ name:"Hàn Lộ", day:8, time:"20:14" }, { name:"Sương Giáng", day:23, time:"23:19" }],
        11:  [{ name:"Lập Đông", day:7, time:"23:34" }, { name:"Tiểu Tuyết", day:22, time:"21:01" }],
        12:  [{ name:"Đại Tuyết", day:7, time:"16:31" }, { name:"Đông Chí", day:22, time:"10:25" }]
    },
    2024: {
        1:  [{ name:"Tiểu Hàn", day:6, time:"03:47" }, { name:"Đại Hàn", day:20, time:"21:05" }],
        2:  [{ name:"Lập Xuân", day:4, time:"15:25" }, { name:"Vũ Thủy", day:19, time:"11:11" }],
        3:  [{ name:"Kinh Trập", day:5, time:"09:21" }, { name:"Xuân Phân", day:20, time:"10:05" }],
        4:  [{ name:"Thanh Minh", day:4, time:"14:00" }, { name:"Cốc Vũ", day:19, time:"20:58" }],
        5:  [{ name:"Lập Hạ", day:5, time:"07:08" }, { name:"Tiểu Mãn", day:20, time:"19:58" }],
        6:  [{ name:"Mang Chủng", day:5, time:"11:08" }, { name:"Hạ Chí", day:21, time:"03:49" }],
        7:  [{ name:"Tiểu Thử", day:6, time:"21:19" }, { name:"Đại Thử", day:22, time:"14:43" }],
        8:  [{ name:"Lập Thu", day:7, time:"07:08" }, { name:"Xử Thử", day:22, time:"21:53" }],
        9:  [{ name:"Bạch Lộ", day:7, time:"10:10" }, { name:"Thu Phân", day:22, time:"19:42" }],
        10:  [{ name:"Hàn Lộ", day:8, time:"01:58" }, { name:"Sương Giáng", day:23, time:"05:13" }],
        11:  [{ name:"Lập Đông", day:7, time:"05:18" }, { name:"Tiểu Tuyết", day:22, time:"02:55" }],
        12:  [{ name:"Đại Tuyết", day:6, time:"22:15" }, { name:"Đông Chí", day:21, time:"16:19" }]
    },
    2025: {
        1:  [{ name:"Tiểu Hàn", day:5, time:"09:31" }, { name:"Đại Hàn", day:20, time:"02:58" }],
        2:  [{ name:"Lập Xuân", day:3, time:"21:09" }, { name:"Vũ Thủy", day:18, time:"17:05" }],
        3:  [{ name:"Kinh Trập", day:5, time:"15:05" }, { name:"Xuân Phân", day:20, time:"16:00" }],
        4:  [{ name:"Thanh Minh", day:4, time:"19:47" }, { name:"Cốc Vũ", day:20, time:"02:55" }],
        5:  [{ name:"Lập Hạ", day:5, time:"12:56" }, { name:"Tiểu Mãn", day:21, time:"01:53" }],
        6:  [{ name:"Mang Chủng", day:5, time:"16:55" }, { name:"Hạ Chí", day:21, time:"09:41" }],
        7:  [{ name:"Tiểu Thử", day:7, time:"03:03" }, { name:"Đại Thử", day:22, time:"20:28" }],
        8:  [{ name:"Lập Thu", day:7, time:"12:50" }, { name:"Xử Thử", day:23, time:"03:32" }],
        9:  [{ name:"Bạch Lộ", day:7, time:"15:50" }, { name:"Thu Phân", day:23, time:"01:18" }],
        10:  [{ name:"Hàn Lộ", day:8, time:"07:40" }, { name:"Sương Giáng", day:23, time:"10:49" }],
        11:  [{ name:"Lập Đông", day:7, time:"11:02" }, { name:"Tiểu Tuyết", day:22, time:"08:34" }],
        12:  [{ name:"Đại Tuyết", day:7, time:"04:03" }, { name:"Đông Chí", day:21, time:"22:01" }]
    },
    2026: {
        1:  [{ name:"Tiểu Hàn", day:5, time:"15:21" }, { name:"Đại Hàn", day:20, time:"08:43" }],
        2:  [{ name:"Lập Xuân", day:4, time:"03:00" }, { name:"Vũ Thủy", day:18, time:"22:50" }],
        3:  [{ name:"Kinh Trập", day:5, time:"20:57" }, { name:"Xuân Phân", day:20, time:"21:44" }],
        4:  [{ name:"Thanh Minh", day:5, time:"01:38" }, { name:"Cốc Vũ", day:20, time:"08:37" }],
        5:  [{ name:"Lập Hạ", day:5, time:"18:47" }, { name:"Tiểu Mãn", day:21, time:"07:35" }],
        6:  [{ name:"Mang Chủng", day:5, time:"22:47" }, { name:"Hạ Chí", day:21, time:"15:23" }],
        7:  [{ name:"Tiểu Thử", day:7, time:"08:55" }, { name:"Đại Thử", day:23, time:"02:11" }],
        8:  [{ name:"Lập Thu", day:7, time:"18:41" }, { name:"Xử Thử", day:23, time:"09:17" }],
        9:  [{ name:"Bạch Lộ", day:7, time:"21:40" }, { name:"Thu Phân", day:23, time:"07:03" }],
        10:  [{ name:"Hàn Lộ", day:8, time:"13:28" }, { name:"Sương Giáng", day:23, time:"16:36" }],
        11:  [{ name:"Lập Đông", day:7, time:"16:50" }, { name:"Tiểu Tuyết", day:22, time:"14:21" }],
        12:  [{ name:"Đại Tuyết", day:7, time:"09:51" }, { name:"Đông Chí", day:22, time:"03:48" }]
    },
    2027: {
        1:  [{ name:"Tiểu Hàn", day:5, time:"21:08" }, { name:"Đại Hàn", day:20, time:"14:28" }],
        2:  [{ name:"Lập Xuân", day:4, time:"08:44" }, { name:"Vũ Thủy", day:19, time:"04:32" }],
        3:  [{ name:"Kinh Trập", day:6, time:"02:38" }, { name:"Xuân Phân", day:21, time:"03:23" }],
        4:  [{ name:"Thanh Minh", day:5, time:"07:16" }, { name:"Cốc Vũ", day:20, time:"14:16" }],
        5:  [{ name:"Lập Hạ", day:6, time:"00:23" }, { name:"Tiểu Mãn", day:21, time:"13:16" }],
        6:  [{ name:"Mang Chủng", day:6, time:"04:24" }, { name:"Hạ Chí", day:21, time:"21:09" }],
        7:  [{ name:"Tiểu Thử", day:7, time:"14:35" }, { name:"Đại Thử", day:23, time:"08:03" }],
        8:  [{ name:"Lập Thu", day:8, time:"00:25" }, { name:"Xử Thử", day:23, time:"15:12" }],
        9:  [{ name:"Bạch Lộ", day:8, time:"03:26" }, { name:"Thu Phân", day:23, time:"13:00" }],
        10:  [{ name:"Hàn Lộ", day:8, time:"19:15" }, { name:"Sương Giáng", day:23, time:"22:31" }],
        11:  [{ name:"Lập Đông", day:7, time:"22:37" }, { name:"Tiểu Tuyết", day:22, time:"20:14" }],
        12:  [{ name:"Đại Tuyết", day:7, time:"15:36" }, { name:"Đông Chí", day:22, time:"09:40" }]
    },
    2028: {
        1:  [{ name:"Tiểu Hàn", day:6, time:"02:53" }, { name:"Đại Hàn", day:20, time:"20:20" }],
        2:  [{ name:"Lập Xuân", day:4, time:"14:29" }, { name:"Vũ Thủy", day:19, time:"10:24" }],
        3:  [{ name:"Kinh Trập", day:5, time:"08:23" }, { name:"Xuân Phân", day:20, time:"09:15" }],
        4:  [{ name:"Thanh Minh", day:4, time:"13:01" }, { name:"Cốc Vũ", day:19, time:"20:08" }],
        5:  [{ name:"Lập Hạ", day:5, time:"06:10" }, { name:"Tiểu Mãn", day:20, time:"19:08" }],
        6:  [{ name:"Mang Chủng", day:5, time:"10:14" }, { name:"Hạ Chí", day:21, time:"03:00" }],
        7:  [{ name:"Tiểu Thử", day:6, time:"20:28" }, { name:"Đại Thử", day:22, time:"13:52" }],
        8:  [{ name:"Lập Thu", day:7, time:"06:19" }, { name:"Xử Thử", day:22, time:"20:59" }],
        9:  [{ name:"Bạch Lộ", day:7, time:"09:20" }, { name:"Thu Phân", day:22, time:"18:43" }],
        10:  [{ name:"Hàn Lộ", day:8, time:"01:06" }, { name:"Sương Giáng", day:23, time:"04:11" }],
        11:  [{ name:"Lập Đông", day:7, time:"04:25" }, { name:"Tiểu Tuyết", day:22, time:"01:53" }],
        12:  [{ name:"Đại Tuyết", day:6, time:"21:23" }, { name:"Đông Chí", day:21, time:"15:18" }]
    },
    2029: {
        1:  [{ name:"Tiểu Hàn", day:5, time:"08:40" }, { name:"Đại Hàn", day:20, time:"01:59" }],
        2:  [{ name:"Lập Xuân", day:3, time:"20:19" }, { name:"Vũ Thủy", day:18, time:"16:06" }],
        3:  [{ name:"Kinh Trập", day:5, time:"14:15" }, { name:"Xuân Phân", day:20, time:"15:00" }],
        4:  [{ name:"Thanh Minh", day:4, time:"18:56" }, { name:"Cốc Vũ", day:20, time:"01:54" }],
        5:  [{ name:"Lập Hạ", day:5, time:"12:06" }, { name:"Tiểu Mãn", day:21, time:"00:54" }],
        6:  [{ name:"Mang Chủng", day:5, time:"16:08" }, { name:"Hạ Chí", day:21, time:"08:46" }],
        7:  [{ name:"Tiểu Thử", day:7, time:"02:20" }, { name:"Đại Thử", day:22, time:"19:40" }],
        8:  [{ name:"Lập Thu", day:7, time:"12:10" }, { name:"Xử Thử", day:23, time:"02:49" }],
        9:  [{ name:"Bạch Lộ", day:7, time:"15:10" }, { name:"Thu Phân", day:23, time:"00:36" }],
        10:  [{ name:"Hàn Lộ", day:8, time:"06:56" }, { name:"Sương Giáng", day:23, time:"10:06" }],
        11:  [{ name:"Lập Đông", day:7, time:"10:15" }, { name:"Tiểu Tuyết", day:22, time:"07:47" }],
        12:  [{ name:"Đại Tuyết", day:7, time:"03:12" }, { name:"Đông Chí", day:21, time:"21:12" }]
    },
    2030: {
        1:  [{ name:"Tiểu Hàn", day:5, time:"14:29" }, { name:"Đại Hàn", day:20, time:"07:53" }],
        2:  [{ name:"Lập Xuân", day:4, time:"02:07" }, { name:"Vũ Thủy", day:18, time:"21:58" }],
        3:  [{ name:"Kinh Trập", day:5, time:"20:01" }, { name:"Xuân Phân", day:20, time:"20:50" }],
        4:  [{ name:"Thanh Minh", day:5, time:"00:39" }, { name:"Cốc Vũ", day:20, time:"07:41" }],
        5:  [{ name:"Lập Hạ", day:5, time:"17:44" }, { name:"Tiểu Mãn", day:21, time:"06:39" }],
        6:  [{ name:"Mang Chủng", day:5, time:"21:43" }, { name:"Hạ Chí", day:21, time:"14:30" }],
        7:  [{ name:"Tiểu Thử", day:7, time:"07:54" }, { name:"Đại Thử", day:23, time:"01:23" }],
        8:  [{ name:"Lập Thu", day:7, time:"17:45" }, { name:"Xử Thử", day:23, time:"08:35" }],
        9:  [{ name:"Bạch Lộ", day:7, time:"20:51" }, { name:"Thu Phân", day:23, time:"06:25" }],
        10:  [{ name:"Hàn Lộ", day:8, time:"12:43" }, { name:"Sương Giáng", day:23, time:"15:59" }],
        11:  [{ name:"Lập Đông", day:7, time:"16:07" }, { name:"Tiểu Tuyết", day:22, time:"13:43" }],
        12:  [{ name:"Đại Tuyết", day:7, time:"09:06" }, { name:"Đông Chí", day:22, time:"03:08" }]
    },
    2031: {
        1:  [{ name:"Tiểu Hàn", day:5, time:"20:21" }, { name:"Đại Hàn", day:20, time:"13:46" }],
        2:  [{ name:"Lập Xuân", day:4, time:"07:57" }, { name:"Vũ Thủy", day:19, time:"03:49" }],
        3:  [{ name:"Kinh Trập", day:6, time:"01:49" }, { name:"Xuân Phân", day:21, time:"02:39" }],
        4:  [{ name:"Thanh Minh", day:5, time:"06:27" }, { name:"Cốc Vũ", day:20, time:"13:29" }],
        5:  [{ name:"Lập Hạ", day:5, time:"23:33" }, { name:"Tiểu Mãn", day:21, time:"12:26" }],
        6:  [{ name:"Mang Chủng", day:6, time:"03:34" }, { name:"Hạ Chí", day:21, time:"20:15" }],
        7:  [{ name:"Tiểu Thử", day:7, time:"13:47" }, { name:"Đại Thử", day:23, time:"07:09" }],
        8:  [{ name:"Lập Thu", day:7, time:"23:41" }, { name:"Xử Thử", day:23, time:"14:21" }],
        9:  [{ name:"Bạch Lộ", day:8, time:"02:48" }, { name:"Thu Phân", day:23, time:"12:14" }],
        10:  [{ name:"Hàn Lộ", day:8, time:"18:41" }, { name:"Sương Giáng", day:23, time:"21:48" }],
        11:  [{ name:"Lập Đông", day:7, time:"22:04" }, { name:"Tiểu Tuyết", day:22, time:"19:31" }],
        12:  [{ name:"Đại Tuyết", day:7, time:"15:01" }, { name:"Đông Chí", day:22, time:"08:54" }]
    },
    2032: {
        1:  [{ name:"Tiểu Hàn", day:6, time:"02:14" }, { name:"Đại Hàn", day:20, time:"19:30" }],
        2:  [{ name:"Lập Xuân", day:4, time:"13:47" }, { name:"Vũ Thủy", day:19, time:"09:30" }],
        3:  [{ name:"Kinh Trập", day:5, time:"07:38" }, { name:"Xuân Phân", day:20, time:"08:20" }],
        4:  [{ name:"Thanh Minh", day:4, time:"12:16" }, { name:"Cốc Vũ", day:19, time:"19:12" }],
        5:  [{ name:"Lập Hạ", day:5, time:"05:24" }, { name:"Tiểu Mãn", day:20, time:"18:13" }],
        6:  [{ name:"Mang Chủng", day:5, time:"09:26" }, { name:"Hạ Chí", day:21, time:"02:07" }],
        7:  [{ name:"Tiểu Thử", day:6, time:"19:39" }, { name:"Đại Thử", day:22, time:"13:03" }],
        8:  [{ name:"Lập Thu", day:7, time:"05:31" }, { name:"Xử Thử", day:22, time:"20:17" }],
        9:  [{ name:"Bạch Lộ", day:7, time:"08:36" }, { name:"Thu Phân", day:22, time:"18:09" }],
        10:  [{ name:"Hàn Lộ", day:8, time:"00:28" }, { name:"Sương Giáng", day:23, time:"03:44" }],
        11:  [{ name:"Lập Đông", day:7, time:"03:52" }, { name:"Tiểu Tuyết", day:22, time:"01:29" }],
        12:  [{ name:"Đại Tuyết", day:6, time:"20:51" }, { name:"Đông Chí", day:21, time:"14:54" }]
    },
    2033: {
        1:  [{ name:"Tiểu Hàn", day:5, time:"08:06" }, { name:"Đại Hàn", day:20, time:"01:31" }],
        2:  [{ name:"Lập Xuân", day:3, time:"19:40" }, { name:"Vũ Thủy", day:18, time:"15:32" }],
        3:  [{ name:"Kinh Trập", day:5, time:"13:31" }, { name:"Xuân Phân", day:20, time:"14:21" }],
        4:  [{ name:"Thanh Minh", day:4, time:"18:06" }, { name:"Cốc Vũ", day:20, time:"01:11" }],
        5:  [{ name:"Lập Hạ", day:5, time:"11:12" }, { name:"Tiểu Mãn", day:21, time:"00:09" }],
        6:  [{ name:"Mang Chủng", day:5, time:"15:11" }, { name:"Hạ Chí", day:21, time:"07:59" }],
        7:  [{ name:"Tiểu Thử", day:7, time:"01:23" }, { name:"Đại Thử", day:22, time:"18:51" }],
        8:  [{ name:"Lập Thu", day:7, time:"11:14" }, { name:"Xử Thử", day:23, time:"02:00" }],
        9:  [{ name:"Bạch Lộ", day:7, time:"14:19" }, { name:"Thu Phân", day:22, time:"23:50" }],
        10:  [{ name:"Hàn Lộ", day:8, time:"06:12" }, { name:"Sương Giáng", day:23, time:"09:26" }],
        11:  [{ name:"Lập Đông", day:7, time:"09:39" }, { name:"Tiểu Tuyết", day:22, time:"07:14" }],
        12:  [{ name:"Đại Tuyết", day:7, time:"02:43" }, { name:"Đông Chí", day:21, time:"20:44" }]
    },
    2034: {
        1:  [{ name:"Tiểu Hàn", day:5, time:"14:02" }, { name:"Đại Hàn", day:20, time:"07:25" }],
        2:  [{ name:"Lập Xuân", day:4, time:"01:39" }, { name:"Vũ Thủy", day:18, time:"21:28" }],
        3:  [{ name:"Kinh Trập", day:5, time:"19:31" }, { name:"Xuân Phân", day:20, time:"20:16" }],
        4:  [{ name:"Thanh Minh", day:5, time:"00:05" }, { name:"Cốc Vũ", day:20, time:"07:02" }],
        5:  [{ name:"Lập Hạ", day:5, time:"17:08" }, { name:"Tiểu Mãn", day:21, time:"05:55" }],
        6:  [{ name:"Mang Chủng", day:5, time:"21:05" }, { name:"Hạ Chí", day:21, time:"13:43" }],
        7:  [{ name:"Tiểu Thử", day:7, time:"07:16" }, { name:"Đại Thử", day:23, time:"00:34" }],
        8:  [{ name:"Lập Thu", day:7, time:"17:07" }, { name:"Xử Thử", day:23, time:"07:46" }],
        9:  [{ name:"Bạch Lộ", day:7, time:"20:12" }, { name:"Thu Phân", day:23, time:"05:38" }],
        10:  [{ name:"Hàn Lộ", day:8, time:"12:05" }, { name:"Sương Giáng", day:23, time:"15:14" }],
        11:  [{ name:"Lập Đông", day:7, time:"15:32" }, { name:"Tiểu Tuyết", day:22, time:"13:03" }],
        12:  [{ name:"Đại Tuyết", day:7, time:"08:35" }, { name:"Đông Chí", day:22, time:"02:32" }]
    },
    2035: {
        1:  [{ name:"Tiểu Hàn", day:5, time:"19:54" }, { name:"Đại Hàn", day:20, time:"13:12" }],
        2:  [{ name:"Lập Xuân", day:4, time:"07:30" }, { name:"Vũ Thủy", day:19, time:"03:15" }],
        3:  [{ name:"Kinh Trập", day:6, time:"01:20" }, { name:"Xuân Phân", day:21, time:"02:01" }],
        4:  [{ name:"Thanh Minh", day:5, time:"05:52" }, { name:"Cốc Vũ", day:20, time:"12:47" }],
        5:  [{ name:"Lập Hạ", day:5, time:"22:53" }, { name:"Tiểu Mãn", day:21, time:"11:41" }],
        6:  [{ name:"Mang Chủng", day:6, time:"02:48" }, { name:"Hạ Chí", day:21, time:"19:31" }],
        7:  [{ name:"Tiểu Thử", day:7, time:"12:59" }, { name:"Đại Thử", day:23, time:"06:27" }],
        8:  [{ name:"Lập Thu", day:7, time:"22:52" }, { name:"Xử Thử", day:23, time:"13:42" }],
        9:  [{ name:"Bạch Lộ", day:8, time:"02:01" }, { name:"Thu Phân", day:23, time:"11:37" }],
        10:  [{ name:"Hàn Lộ", day:8, time:"17:56" }, { name:"Sương Giáng", day:23, time:"21:14" }],
        11:  [{ name:"Lập Đông", day:7, time:"21:22" }, { name:"Tiểu Tuyết", day:22, time:"19:01" }],
        12:  [{ name:"Đại Tuyết", day:7, time:"14:23" }, { name:"Đông Chí", day:22, time:"08:29" }]
    },
    2036: {
        1:  [{ name:"Tiểu Hàn", day:6, time:"01:41" }, { name:"Đại Hàn", day:20, time:"19:09" }],
        2:  [{ name:"Lập Xuân", day:4, time:"13:18" }, { name:"Vũ Thủy", day:19, time:"09:12" }],
        3:  [{ name:"Kinh Trập", day:5, time:"07:09" }, { name:"Xuân Phân", day:20, time:"08:01" }],
        4:  [{ name:"Thanh Minh", day:4, time:"11:44" }, { name:"Cốc Vũ", day:19, time:"18:49" }],
        5:  [{ name:"Lập Hạ", day:5, time:"04:48" }, { name:"Tiểu Mãn", day:20, time:"17:43" }],
        6:  [{ name:"Mang Chủng", day:5, time:"08:45" }, { name:"Hạ Chí", day:21, time:"01:30" }],
        7:  [{ name:"Tiểu Thử", day:6, time:"18:55" }, { name:"Đại Thử", day:22, time:"12:21" }],
        8:  [{ name:"Lập Thu", day:7, time:"04:47" }, { name:"Xử Thử", day:22, time:"19:31" }],
        9:  [{ name:"Bạch Lộ", day:7, time:"07:53" }, { name:"Thu Phân", day:22, time:"17:22" }],
        10:  [{ name:"Hàn Lộ", day:7, time:"23:47" }, { name:"Sương Giáng", day:23, time:"02:57" }],
        11:  [{ name:"Lập Đông", day:7, time:"03:12" }, { name:"Tiểu Tuyết", day:22, time:"00:43" }],
        12:  [{ name:"Đại Tuyết", day:6, time:"20:14" }, { name:"Đông Chí", day:21, time:"14:11" }]
    },
    2037: {
        1:  [{ name:"Tiểu Hàn", day:5, time:"07:32" }, { name:"Đại Hàn", day:20, time:"00:51" }],
        2:  [{ name:"Lập Xuân", day:3, time:"19:09" }, { name:"Vũ Thủy", day:18, time:"14:56" }],
        3:  [{ name:"Kinh Trập", day:5, time:"13:04" }, { name:"Xuân Phân", day:20, time:"13:48" }],
        4:  [{ name:"Thanh Minh", day:4, time:"17:42" }, { name:"Cốc Vũ", day:20, time:"00:38" }],
        5:  [{ name:"Lập Hạ", day:5, time:"10:48" }, { name:"Tiểu Mãn", day:20, time:"23:33" }],
        6:  [{ name:"Mang Chủng", day:5, time:"14:45" }, { name:"Hạ Chí", day:21, time:"07:20" }],
        7:  [{ name:"Tiểu Thử", day:7, time:"00:53" }, { name:"Đại Thử", day:22, time:"18:10" }],
        8:  [{ name:"Lập Thu", day:7, time:"10:40" }, { name:"Xử Thử", day:23, time:"01:19" }],
        9:  [{ name:"Bạch Lộ", day:7, time:"13:43" }, { name:"Thu Phân", day:22, time:"23:11" }],
        10:  [{ name:"Hàn Lộ", day:8, time:"05:36" }, { name:"Sương Giáng", day:23, time:"08:48" }],
        11:  [{ name:"Lập Đông", day:7, time:"09:02" }, { name:"Tiểu Tuyết", day:22, time:"06:36" }],
        12:  [{ name:"Đại Tuyết", day:7, time:"02:05" }, { name:"Đông Chí", day:21, time:"20:05" }]
    },
    2038: {
        1:  [{ name:"Tiểu Hàn", day:5, time:"13:25" }, { name:"Đại Hàn", day:20, time:"06:47" }],
        2:  [{ name:"Lập Xuân", day:4, time:"01:01" }, { name:"Vũ Thủy", day:18, time:"20:50" }],
        3:  [{ name:"Kinh Trập", day:5, time:"18:53" }, { name:"Xuân Phân", day:20, time:"19:38" }],
        4:  [{ name:"Thanh Minh", day:4, time:"23:27" }, { name:"Cốc Vũ", day:20, time:"06:26" }],
        5:  [{ name:"Lập Hạ", day:5, time:"16:29" }, { name:"Tiểu Mãn", day:21, time:"05:21" }],
        6:  [{ name:"Mang Chủng", day:5, time:"20:23" }, { name:"Hạ Chí", day:21, time:"13:08" }],
        7:  [{ name:"Tiểu Thử", day:7, time:"06:31" }, { name:"Đại Thử", day:22, time:"23:58" }],
        8:  [{ name:"Lập Thu", day:7, time:"16:19" }, { name:"Xử Thử", day:23, time:"07:08" }],
        9:  [{ name:"Bạch Lộ", day:7, time:"19:24" }, { name:"Thu Phân", day:23, time:"05:00" }],
        10:  [{ name:"Hàn Lộ", day:8, time:"11:20" }, { name:"Sương Giáng", day:23, time:"14:39" }],
        11:  [{ name:"Lập Đông", day:7, time:"14:49" }, { name:"Tiểu Tuyết", day:22, time:"12:29" }],
        12:  [{ name:"Đại Tuyết", day:7, time:"07:54" }, { name:"Đông Chí", day:22, time:"02:00" }]
    },
    2039: {
        1:  [{ name:"Tiểu Hàn", day:5, time:"19:14" }, { name:"Đại Hàn", day:20, time:"12:41" }],
        2:  [{ name:"Lập Xuân", day:4, time:"06:51" }, { name:"Vũ Thủy", day:19, time:"02:43" }],
        3:  [{ name:"Kinh Trập", day:6, time:"00:41" }, { name:"Xuân Phân", day:21, time:"01:30" }],
        4:  [{ name:"Thanh Minh", day:5, time:"05:14" }, { name:"Cốc Vũ", day:20, time:"12:16" }],
        5:  [{ name:"Lập Hạ", day:5, time:"22:16" }, { name:"Tiểu Mãn", day:21, time:"11:09" }],
        6:  [{ name:"Mang Chủng", day:6, time:"02:13" }, { name:"Hạ Chí", day:21, time:"18:55" }],
        7:  [{ name:"Tiểu Thử", day:7, time:"12:24" }, { name:"Đại Thử", day:23, time:"05:46" }],
        8:  [{ name:"Lập Thu", day:7, time:"22:16" }, { name:"Xử Thử", day:23, time:"12:56" }],
        9:  [{ name:"Bạch Lộ", day:8, time:"01:22" }, { name:"Thu Phân", day:23, time:"10:47" }],
        10:  [{ name:"Hàn Lộ", day:8, time:"17:15" }, { name:"Sương Giáng", day:23, time:"20:23" }],
        11:  [{ name:"Lập Đông", day:7, time:"20:41" }, { name:"Tiểu Tuyết", day:22, time:"18:10" }],
        12:  [{ name:"Đại Tuyết", day:7, time:"13:43" }, { name:"Đông Chí", day:22, time:"07:39" }]
    },
    2040: {
        1:  [{ name:"Tiểu Hàn", day:6, time:"01:01" }, { name:"Đại Hàn", day:20, time:"18:19" }],
        2:  [{ name:"Lập Xuân", day:4, time:"12:37" }, { name:"Vũ Thủy", day:19, time:"08:21" }],
        3:  [{ name:"Kinh Trập", day:5, time:"06:29" }, { name:"Xuân Phân", day:20, time:"07:09" }],
        4:  [{ name:"Thanh Minh", day:4, time:"11:03" }, { name:"Cốc Vũ", day:19, time:"17:58" }],
        5:  [{ name:"Lập Hạ", day:5, time:"04:08" }, { name:"Tiểu Mãn", day:20, time:"16:54" }],
        6:  [{ name:"Mang Chủng", day:5, time:"08:06" }, { name:"Hạ Chí", day:21, time:"00:45" }],
        7:  [{ name:"Tiểu Thử", day:6, time:"18:18" }, { name:"Đại Thử", day:22, time:"11:39" }],
        8:  [{ name:"Lập Thu", day:7, time:"04:08" }, { name:"Xử Thử", day:22, time:"18:51" }],
        9:  [{ name:"Bạch Lộ", day:7, time:"07:12" }, { name:"Thu Phân", day:22, time:"16:43" }],
        10:  [{ name:"Hàn Lộ", day:7, time:"23:03" }, { name:"Sương Giáng", day:23, time:"02:17" }],
        11:  [{ name:"Lập Đông", day:7, time:"02:27" }, { name:"Tiểu Tuyết", day:22, time:"00:03" }],
        12:  [{ name:"Đại Tuyết", day:6, time:"19:28" }, { name:"Đông Chí", day:21, time:"13:31" }]
    },
    2041: {
        1:  [{ name:"Tiểu Hàn", day:5, time:"06:46" }, { name:"Đại Hàn", day:20, time:"00:11" }],
        2:  [{ name:"Lập Xuân", day:3, time:"18:23" }, { name:"Vũ Thủy", day:18, time:"14:15" }],
        3:  [{ name:"Kinh Trập", day:5, time:"12:16" }, { name:"Xuân Phân", day:20, time:"13:05" }],
        4:  [{ name:"Thanh Minh", day:4, time:"16:50" }, { name:"Cốc Vũ", day:19, time:"23:53" }],
        5:  [{ name:"Lập Hạ", day:5, time:"09:53" }, { name:"Tiểu Mãn", day:20, time:"22:47" }],
        6:  [{ name:"Mang Chủng", day:5, time:"13:48" }, { name:"Hạ Chí", day:21, time:"06:34" }],
        7:  [{ name:"Tiểu Thử", day:6, time:"23:56" }, { name:"Đại Thử", day:22, time:"17:25" }],
        8:  [{ name:"Lập Thu", day:7, time:"09:46" }, { name:"Xử Thử", day:23, time:"00:34" }],
        9:  [{ name:"Bạch Lộ", day:7, time:"12:52" }, { name:"Thu Phân", day:22, time:"22:25" }],
        10:  [{ name:"Hàn Lộ", day:8, time:"04:45" }, { name:"Sương Giáng", day:23, time:"08:00" }],
        11:  [{ name:"Lập Đông", day:7, time:"08:11" }, { name:"Tiểu Tuyết", day:22, time:"05:47" }],
        12:  [{ name:"Đại Tuyết", day:7, time:"01:14" }, { name:"Đông Chí", day:21, time:"19:16" }]
    },
    2042: {
        1:  [{ name:"Tiểu Hàn", day:5, time:"12:33" }, { name:"Đại Hàn", day:20, time:"05:58" }],
        2:  [{ name:"Lập Xuân", day:4, time:"00:11" }, { name:"Vũ Thủy", day:18, time:"20:02" }],
        3:  [{ name:"Kinh Trập", day:5, time:"18:04" }, { name:"Xuân Phân", day:20, time:"18:51" }],
        4:  [{ name:"Thanh Minh", day:4, time:"22:38" }, { name:"Cốc Vũ", day:20, time:"05:37" }],
        5:  [{ name:"Lập Hạ", day:5, time:"15:41" }, { name:"Tiểu Mãn", day:21, time:"04:29" }],
        6:  [{ name:"Mang Chủng", day:5, time:"19:37" }, { name:"Hạ Chí", day:21, time:"12:14" }],
        7:  [{ name:"Tiểu Thử", day:7, time:"05:45" }, { name:"Đại Thử", day:22, time:"23:04" }],
        8:  [{ name:"Lập Thu", day:7, time:"15:37" }, { name:"Xử Thử", day:23, time:"06:16" }],
        9:  [{ name:"Bạch Lộ", day:7, time:"18:43" }, { name:"Thu Phân", day:23, time:"04:09" }],
        10:  [{ name:"Hàn Lộ", day:8, time:"10:39" }, { name:"Sương Giáng", day:23, time:"13:48" }],
        11:  [{ name:"Lập Đông", day:7, time:"14:06" }, { name:"Tiểu Tuyết", day:22, time:"11:35" }],
        12:  [{ name:"Đại Tuyết", day:7, time:"07:07" }, { name:"Đông Chí", day:22, time:"01:02" }]
    },
    2043: {
        1:  [{ name:"Tiểu Hàn", day:5, time:"18:23" }, { name:"Đại Hàn", day:20, time:"11:40" }],
        2:  [{ name:"Lập Xuân", day:4, time:"05:57" }, { name:"Vũ Thủy", day:19, time:"01:40" }],
        3:  [{ name:"Kinh Trập", day:5, time:"23:46" }, { name:"Xuân Phân", day:21, time:"00:26" }],
        4:  [{ name:"Thanh Minh", day:5, time:"04:18" }, { name:"Cốc Vũ", day:20, time:"11:12" }],
        5:  [{ name:"Lập Hạ", day:5, time:"21:19" }, { name:"Tiểu Mãn", day:21, time:"10:07" }],
        6:  [{ name:"Mang Chủng", day:6, time:"01:15" }, { name:"Hạ Chí", day:21, time:"17:56" }],
        7:  [{ name:"Tiểu Thử", day:7, time:"11:26" }, { name:"Đại Thử", day:23, time:"04:51" }],
        8:  [{ name:"Lập Thu", day:7, time:"21:19" }, { name:"Xử Thử", day:23, time:"12:07" }],
        9:  [{ name:"Bạch Lộ", day:8, time:"00:28" }, { name:"Thu Phân", day:23, time:"10:04" }],
        10:  [{ name:"Hàn Lộ", day:8, time:"16:25" }, { name:"Sương Giáng", day:23, time:"19:44" }],
        11:  [{ name:"Lập Đông", day:7, time:"19:53" }, { name:"Tiểu Tuyết", day:22, time:"17:33" }],
        12:  [{ name:"Đại Tuyết", day:7, time:"12:55" }, { name:"Đông Chí", day:22, time:"06:59" }]
    },
    2044: {
        1:  [{ name:"Tiểu Hàn", day:6, time:"00:10" }, { name:"Đại Hàn", day:20, time:"17:35" }],
        2:  [{ name:"Lập Xuân", day:4, time:"11:42" }, { name:"Vũ Thủy", day:19, time:"07:33" }],
        3:  [{ name:"Kinh Trập", day:5, time:"05:29" }, { name:"Xuân Phân", day:20, time:"06:18" }],
        4:  [{ name:"Thanh Minh", day:4, time:"10:01" }, { name:"Cốc Vũ", day:19, time:"17:05" }],
        5:  [{ name:"Lập Hạ", day:5, time:"03:03" }, { name:"Tiểu Mãn", day:20, time:"16:00" }],
        6:  [{ name:"Mang Chủng", day:5, time:"07:02" }, { name:"Hạ Chí", day:20, time:"23:49" }],
        7:  [{ name:"Tiểu Thử", day:6, time:"17:13" }, { name:"Đại Thử", day:22, time:"10:41" }],
        8:  [{ name:"Lập Thu", day:7, time:"03:06" }, { name:"Xử Thử", day:22, time:"17:53" }],
        9:  [{ name:"Bạch Lộ", day:7, time:"06:14" }, { name:"Thu Phân", day:22, time:"15:46" }],
        10:  [{ name:"Hàn Lộ", day:7, time:"22:11" }, { name:"Sương Giáng", day:23, time:"01:24" }],
        11:  [{ name:"Lập Đông", day:7, time:"01:39" }, { name:"Tiểu Tuyết", day:21, time:"23:13" }],
        12:  [{ name:"Đại Tuyết", day:6, time:"18:43" }, { name:"Đông Chí", day:21, time:"12:42" }]
    },
    2045: {
        1:  [{ name:"Tiểu Hàn", day:5, time:"06:01" }, { name:"Đại Hàn", day:19, time:"23:20" }],
        2:  [{ name:"Lập Xuân", day:3, time:"17:34" }, { name:"Vũ Thủy", day:18, time:"13:20" }],
        3:  [{ name:"Kinh Trập", day:5, time:"11:23" }, { name:"Xuân Phân", day:20, time:"12:05" }],
        4:  [{ name:"Thanh Minh", day:4, time:"15:55" }, { name:"Cốc Vũ", day:19, time:"22:50" }],
        5:  [{ name:"Lập Hạ", day:5, time:"08:57" }, { name:"Tiểu Mãn", day:20, time:"21:44" }],
        6:  [{ name:"Mang Chủng", day:5, time:"12:55" }, { name:"Hạ Chí", day:21, time:"05:32" }],
        7:  [{ name:"Tiểu Thử", day:6, time:"23:06" }, { name:"Đại Thử", day:22, time:"16:24" }],
        8:  [{ name:"Lập Thu", day:7, time:"08:57" }, { name:"Xử Thử", day:22, time:"23:37" }],
        9:  [{ name:"Bạch Lộ", day:7, time:"12:03" }, { name:"Thu Phân", day:22, time:"21:31" }],
        10:  [{ name:"Hàn Lộ", day:8, time:"03:58" }, { name:"Sương Giáng", day:23, time:"07:10" }],
        11:  [{ name:"Lập Đông", day:7, time:"07:28" }, { name:"Tiểu Tuyết", day:22, time:"05:01" }],
        12:  [{ name:"Đại Tuyết", day:7, time:"00:33" }, { name:"Đông Chí", day:21, time:"18:33" }]
    },
    2046: {
        1:  [{ name:"Tiểu Hàn", day:5, time:"11:54" }, { name:"Đại Hàn", day:20, time:"05:13" }],
        2:  [{ name:"Lập Xuân", day:3, time:"23:29" }, { name:"Vũ Thủy", day:18, time:"19:13" }],
        3:  [{ name:"Kinh Trập", day:5, time:"17:15" }, { name:"Xuân Phân", day:20, time:"17:56" }],
        4:  [{ name:"Thanh Minh", day:4, time:"21:43" }, { name:"Cốc Vũ", day:20, time:"04:37" }],
        5:  [{ name:"Lập Hạ", day:5, time:"14:38" }, { name:"Tiểu Mãn", day:21, time:"03:26" }],
        6:  [{ name:"Mang Chủng", day:5, time:"18:30" }, { name:"Hạ Chí", day:21, time:"11:13" }],
        7:  [{ name:"Tiểu Thử", day:7, time:"04:38" }, { name:"Đại Thử", day:22, time:"22:07" }],
        8:  [{ name:"Lập Thu", day:7, time:"14:31" }, { name:"Xử Thử", day:23, time:"05:22" }],
        9:  [{ name:"Bạch Lộ", day:7, time:"17:41" }, { name:"Thu Phân", day:23, time:"03:20" }],
        10:  [{ name:"Hàn Lộ", day:8, time:"09:40" }, { name:"Sương Giáng", day:23, time:"13:01" }],
        11:  [{ name:"Lập Đông", day:7, time:"13:12" }, { name:"Tiểu Tuyết", day:22, time:"10:54" }],
        12:  [{ name:"Đại Tuyết", day:7, time:"06:19" }, { name:"Đông Chí", day:22, time:"00:26" }]
    },
    2047: {
        1:  [{ name:"Tiểu Hàn", day:5, time:"17:40" }, { name:"Đại Hàn", day:20, time:"11:07" }],
        2:  [{ name:"Lập Xuân", day:4, time:"05:16" }, { name:"Vũ Thủy", day:19, time:"01:08" }],
        3:  [{ name:"Kinh Trập", day:5, time:"23:03" }, { name:"Xuân Phân", day:20, time:"23:51" }],
        4:  [{ name:"Thanh Minh", day:5, time:"03:31" }, { name:"Cốc Vũ", day:20, time:"10:30" }],
        5:  [{ name:"Lập Hạ", day:5, time:"20:26" }, { name:"Tiểu Mãn", day:21, time:"09:17" }],
        6:  [{ name:"Mang Chủng", day:6, time:"00:18" }, { name:"Hạ Chí", day:21, time:"17:01" }],
        7:  [{ name:"Tiểu Thử", day:7, time:"10:28" }, { name:"Đại Thử", day:23, time:"03:53" }],
        8:  [{ name:"Lập Thu", day:7, time:"20:24" }, { name:"Xử Thử", day:23, time:"11:09" }],
        9:  [{ name:"Bạch Lộ", day:7, time:"23:36" }, { name:"Thu Phân", day:23, time:"09:06" }],
        10:  [{ name:"Hàn Lộ", day:8, time:"15:35" }, { name:"Sương Giáng", day:23, time:"18:46" }],
        11:  [{ name:"Lập Đông", day:7, time:"19:05" }, { name:"Tiểu Tuyết", day:22, time:"16:36" }],
        12:  [{ name:"Đại Tuyết", day:7, time:"12:09" }, { name:"Đông Chí", day:22, time:"06:05" }]
    },
    2048: {
        1:  [{ name:"Tiểu Hàn", day:5, time:"23:27" }, { name:"Đại Hàn", day:20, time:"16:45" }],
        2:  [{ name:"Lập Xuân", day:4, time:"11:02" }, { name:"Vũ Thủy", day:19, time:"06:46" }],
        3:  [{ name:"Kinh Trập", day:5, time:"04:52" }, { name:"Xuân Phân", day:20, time:"05:31" }],
        4:  [{ name:"Thanh Minh", day:4, time:"09:23" }, { name:"Cốc Vũ", day:19, time:"16:15" }],
        5:  [{ name:"Lập Hạ", day:5, time:"02:22" }, { name:"Tiểu Mãn", day:20, time:"15:06" }],
        6:  [{ name:"Mang Chủng", day:5, time:"06:16" }, { name:"Hạ Chí", day:20, time:"22:52" }],
        7:  [{ name:"Tiểu Thử", day:6, time:"16:25" }, { name:"Đại Thử", day:22, time:"09:45" }],
        8:  [{ name:"Lập Thu", day:7, time:"02:17" }, { name:"Xử Thử", day:22, time:"17:01" }],
        9:  [{ name:"Bạch Lộ", day:7, time:"05:26" }, { name:"Thu Phân", day:22, time:"14:59" }],
        10:  [{ name:"Hàn Lộ", day:7, time:"21:25" }, { name:"Sương Giáng", day:23, time:"00:40" }],
        11:  [{ name:"Lập Đông", day:7, time:"00:54" }, { name:"Tiểu Tuyết", day:21, time:"22:31" }],
        12:  [{ name:"Đại Tuyết", day:6, time:"17:58" }, { name:"Đông Chí", day:21, time:"12:00" }]
    },
    2049: {
        1:  [{ name:"Tiểu Hàn", day:5, time:"05:17" }, { name:"Đại Hàn", day:19, time:"22:39" }],
        2:  [{ name:"Lập Xuân", day:3, time:"16:51" }, { name:"Vũ Thủy", day:18, time:"12:40" }],
        3:  [{ name:"Kinh Trập", day:5, time:"10:41" }, { name:"Xuân Phân", day:20, time:"11:27" }],
        4:  [{ name:"Thanh Minh", day:4, time:"15:12" }, { name:"Cốc Vũ", day:19, time:"22:11" }],
        5:  [{ name:"Lập Hạ", day:5, time:"08:11" }, { name:"Tiểu Mãn", day:20, time:"21:02" }],
        6:  [{ name:"Mang Chủng", day:5, time:"12:02" }, { name:"Hạ Chí", day:21, time:"04:45" }],
        7:  [{ name:"Tiểu Thử", day:6, time:"22:06" }, { name:"Đại Thử", day:22, time:"15:34" }],
        8:  [{ name:"Lập Thu", day:7, time:"07:55" }, { name:"Xử Thử", day:22, time:"22:45" }],
        9:  [{ name:"Bạch Lộ", day:7, time:"11:03" }, { name:"Thu Phân", day:22, time:"20:41" }],
        10:  [{ name:"Hàn Lộ", day:8, time:"03:03" }, { name:"Sương Giáng", day:23, time:"06:23" }],
        11:  [{ name:"Lập Đông", day:7, time:"06:36" }, { name:"Tiểu Tuyết", day:22, time:"04:17" }],
        12:  [{ name:"Đại Tuyết", day:6, time:"23:44" }, { name:"Đông Chí", day:21, time:"17:50" }]
    },
    2050: {
        1:  [{ name:"Tiểu Hàn", day:5, time:"11:06" }, { name:"Đại Hàn", day:20, time:"04:32" }],
        2:  [{ name:"Lập Xuân", day:3, time:"22:42" }, { name:"Vũ Thủy", day:18, time:"18:33" }],
        3:  [{ name:"Kinh Trập", day:5, time:"16:31" }, { name:"Xuân Phân", day:20, time:"17:17" }],
        4:  [{ name:"Thanh Minh", day:4, time:"21:01" }, { name:"Cốc Vũ", day:20, time:"04:00" }],
        5:  [{ name:"Lập Hạ", day:5, time:"14:00" }, { name:"Tiểu Mãn", day:21, time:"02:49" }],
        6:  [{ name:"Mang Chủng", day:5, time:"17:53" }, { name:"Hạ Chí", day:21, time:"10:31" }],
        7:  [{ name:"Tiểu Thử", day:7, time:"04:00" }, { name:"Đại Thử", day:22, time:"21:19" }],
        8:  [{ name:"Lập Thu", day:7, time:"13:50" }, { name:"Xử Thử", day:23, time:"04:30" }],
        9:  [{ name:"Bạch Lộ", day:7, time:"16:58" }, { name:"Thu Phân", day:23, time:"02:26" }],
        10:  [{ name:"Hàn Lộ", day:8, time:"08:58" }, { name:"Sương Giáng", day:23, time:"12:10" }],
        11:  [{ name:"Lập Đông", day:7, time:"12:31" }, { name:"Tiểu Tuyết", day:22, time:"10:04" }],
        12:  [{ name:"Đại Tuyết", day:7, time:"05:39" }, { name:"Đông Chí", day:21, time:"23:36" }]
    }
};

// 12 "Tiết" (khác "Khí") mở đầu mỗi tháng Nguyệt Lệnh thật — dùng để tính
// Lịch Tiết Khí. Đây LUÔN là phần tử đầu tiên [0] của mỗi mảng tháng ở trên.
const TIET_TO_CHI = {
    "Tiểu Hàn":"Sửu", "Lập Xuân":"Dần", "Kinh Trập":"Mão", "Thanh Minh":"Thìn",
    "Lập Hạ":"Tỵ", "Mang Chủng":"Ngọ", "Tiểu Thử":"Mùi", "Lập Thu":"Thân",
    "Bạch Lộ":"Dậu", "Hàn Lộ":"Tuất", "Lập Đông":"Hợi", "Đại Tuyết":"Tý"
};
const CHI_FROM_DAN = ['Dần','Mão','Thìn','Tỵ','Ngọ','Mùi','Thân','Dậu','Tuất','Hợi','Tý','Sửu'];
const THIEN_CAN = ['Giáp','Ất','Bính','Đinh','Mậu','Kỷ','Canh','Tân','Nhâm','Quý'];

function getSolarTermsForMonth(year, month) {
    if (solarTermsDB[year] && solarTermsDB[year][month]) return solarTermsDB[year][month];
    return [];
}
function getTietKhiForDay(year, month, day) {
    const terms = getSolarTermsForMonth(year, month);
    const term = terms.find(t => t.day === day);
    return term ? term.name : null;
}

// Giờ trong data là giờ ICT (UTC+7) — quy đổi đúng sang mốc UTC thật để so
// sánh chính xác với "now", không phụ thuộc múi giờ trình duyệt người dùng.
function ictInstant(year, month, day, hh, mm) {
    return new Date(Date.UTC(year, month - 1, day, hh - 7, mm));
}

// Dựng "trục thời gian Tiết" (12 mốc/năm) trải toàn bộ solarTermsDB.
let _tietTimeline = null;
function buildTietTimeline() {
    if (_tietTimeline) return _tietTimeline;
    const list = [];
    Object.keys(solarTermsDB).map(Number).sort((a,b)=>a-b).forEach(year => {
        for (let m = 1; m <= 12; m++) {
            const terms = solarTermsDB[year][m];
            if (!terms || !terms.length) continue;
            const t = terms[0]; // phần tử [0] luôn là "Tiết" mở tháng
            if (!TIET_TO_CHI[t.name]) continue;
            const [hh, mm] = t.time.split(':').map(Number);
            list.push({
                name: t.name, chi: TIET_TO_CHI[t.name], year: year,
                day: t.day, month: m, hh, mm,
                instant: ictInstant(year, m, t.day, hh, mm)
            });
        }
    });
    list.sort((a,b) => a.instant - b.instant);
    _tietTimeline = list;
    return list;
}

const DIA_CHI_CHUAN = ['Tý','Sửu','Dần','Mão','Thìn','Tỵ','Ngọ','Mùi','Thân','Dậu','Tuất','Hợi'];
function canChiNamThat(year) {
    const canIdx = ((year - 4) % 10 + 10) % 10;
    const chiIdx = ((year - 4) % 12 + 12) % 12;
    return { can: THIEN_CAN[canIdx], chi: DIA_CHI_CHUAN[chiIdx], text: THIEN_CAN[canIdx] + ' ' + DIA_CHI_CHUAN[chiIdx] };
}

// Ngũ Hổ Độn: Can của tháng Dần theo Can của Năm (Tiết niên).
function stemOfDanFromYearCan(yearCanIdx) {
    return (2 * (yearCanIdx % 5) + 2) % 10;
}

/**
 * Tính Tháng/Năm theo TIẾT KHÍ THẬT cho một thời điểm bất kỳ (đối tượng Date UTC).
 * Trả về null nếu nằm ngoài phạm vi dữ liệu (trước Tiểu Hàn 1950).
 */
function getTietKhiThangNam(dateObj) {
    const timeline = buildTietTimeline();
    let curIdx = -1;
    for (let i = 0; i < timeline.length; i++) {
        if (timeline[i].instant.getTime() <= dateObj.getTime()) curIdx = i; else break;
    }
    if (curIdx === -1) return null;
    const curTiet = timeline[curIdx];

    let yearIdx = -1;
    for (let i = 0; i <= curIdx; i++) {
        if (timeline[i].name === 'Lập Xuân') yearIdx = i;
    }
    if (yearIdx === -1) return null; // trước Lập Xuân đầu tiên trong DB

    const namCC = canChiNamThat(timeline[yearIdx].year);
    const yearCanIdx = THIEN_CAN.indexOf(namCC.can);
    const stemDan = stemOfDanFromYearCan(yearCanIdx);
    const offset = CHI_FROM_DAN.indexOf(curTiet.chi);
    const thangCanIdx = (stemDan + offset) % 10;
    const thangCC = { can: THIEN_CAN[thangCanIdx], chi: curTiet.chi, text: THIEN_CAN[thangCanIdx] + ' ' + curTiet.chi };

    return {
        thangCanChi: thangCC, namCanChi: namCC,
        tietHienHanh: curTiet.name, tietInstant: curTiet.instant,
        tietDay: curTiet.day, tietMonth: curTiet.month, tietYear: curTiet.year,
        tietHH: curTiet.hh, tietMM: curTiet.mm
    };
}

// Kiểm tra 1 ngày dương lịch cụ thể có phải "ngày giao Tiết" (đổi Nguyệt
// Lệnh) hay không — nếu có, trả về thông tin trước/sau mốc giờ giao Tiết.
function getTietTransitionOnDay(year, month, day) {
    const timeline = buildTietTimeline();
    const idx = timeline.findIndex(t => t.year === year && t.month === month && t.day === day);
    if (idx === -1 || idx === 0) return null;
    const before = timeline[idx - 1];
    const after  = timeline[idx];
    const nowThis = getTietKhiThangNam(ictInstant(year, month, day, after.hh, after.mm));
    const beforeThis = getTietKhiThangNam(new Date(before.instant.getTime()));
    return {
        gioGiao: `${String(after.hh).padStart(2,'0')}:${String(after.mm).padStart(2,'0')}`,
        tietTen: after.name,
        thangTruoc: beforeThis ? beforeThis.thangCanChi.text : '—',
        namTruoc: beforeThis ? beforeThis.namCanChi.text : '—',
        thangSau: nowThis ? nowThis.thangCanChi.text : '—',
        namSau: nowThis ? nowThis.namCanChi.text : '—',
        doiNam: after.name === 'Lập Xuân'
    };
}

const LunarDateLib = window._calendar;

function getSocVongInfo(year, month, day) {
    try {
        const sd = new LunarDateLib.SolarDate({ day, month, year });
        const ld = sd.toLunarDate();
        ld.init();
        return {
            lunarDisp: ld.day + '/' + ld.month + (ld.leap ? 'ⁿ' : ''),
            lunarDay:  ld.day + '/' + ld.month + (ld.leap ? ' nhuận' : ''),
            ngayCC:  ld.getDayName()   || 'N/A',
            thangCC: ld.getMonthName() || 'N/A',
            namCC:   ld.getYearName()  || 'N/A'
        };
    } catch (e) { return null; }
}

function currentRealYear() { return new Date().getFullYear(); }

// =========================================================
//  MODAL UTILS (dùng chung cho mọi modal, kể cả modal Ngũ Linh)
// =========================================================
function openModal(id) {
    document.getElementById(id).classList.add('active');
    const res = document.getElementById(id === 'calcDaysModal' ? 'calcResult' : 'findResult');
    if (res) { res.className = 'calc-result'; res.innerHTML = ''; }
}
function closeModal(id) { document.getElementById(id).classList.remove('active'); }
function outsideClose(e, id) { if (e.target.id === id) closeModal(id); }

// =========================================================
//  REAL-TIME DUAL BANNER
// =========================================================
function renderNowBanner() {
    const now = new Date();
    const pad = n => String(n).padStart(2,'0');
    const y = now.getFullYear(), m = now.getMonth()+1, d = now.getDate();

    const soc = getSocVongInfo(y, m, d);
    const tiet = getTietKhiThangNam(now);

    const clockStr = `${pad(now.getHours())}:${pad(now.getMinutes())} — ${pad(d)}/${pad(m)}/${y} (Dương Lịch)`;

    let socHtml = '<div class="empty-note" style="color:rgba(255,255,255,.6)">Không đọc được lịch Sóc Vọng.</div>';
    if (soc) {
        socHtml = `
            <div class="now-line"><span>Ngày Âm</span><b>${soc.lunarDay}</b></div>
            <div class="now-line"><span>Can Chi Ngày</span><b>${soc.ngayCC}</b></div>
            <div class="now-line"><span>Can Chi Tháng</span><b>${soc.thangCC}</b></div>
            <div class="now-line"><span>Can Chi Năm</span><b>${soc.namCC}</b></div>`;
    }

    let tietHtml = '<div class="empty-note" style="color:rgba(255,255,255,.6)">Ngoài phạm vi dữ liệu Tiết Khí (1950–2050).</div>';
    let diffHtml = '';
    if (tiet) {
        const ngayCC = soc ? soc.ngayCC : 'N/A'; // Can Chi Ngày là một trục duy nhất, dùng chung
        tietHtml = `
            <div class="now-line"><span>Tiết hiện hành</span><b>${tiet.tietHienHanh}</b></div>
            <div class="now-line"><span>Can Chi Ngày</span><b>${ngayCC}</b></div>
            <div class="now-line"><span>Can Chi Tháng</span><b>${tiet.thangCanChi.text}</b></div>
            <div class="now-line"><span>Can Chi Năm</span><b>${tiet.namCanChi.text}</b></div>`;

        if (soc && (soc.thangCC !== tiet.thangCanChi.text || soc.namCC !== tiet.namCanChi.text)) {
            diffHtml = `<div class="now-diff-note show">⚠️ Lịch Sóc Vọng &amp; Tiết Khí đang LỆCH nhau tại thời điểm này — đã qua Tiết "${tiet.tietHienHanh}" (${pad(tiet.tietHH)}:${pad(tiet.tietMM)} ngày ${pad(tiet.tietDay)}/${pad(tiet.tietMonth)}/${tiet.tietYear}) nhưng ngày Sóc/Vọng mặt trăng chưa đổi tháng.</div>`;
        }
    }

    document.getElementById('nowBanner').innerHTML = `
        <div class="now-head">
            <span class="clock">🕐 ${clockStr}</span>
            <span class="refresh-note">tự cập nhật mỗi phút</span>
        </div>
        <div class="now-grid">
            <div class="now-card soc">
                <div class="now-card-label">🌙 Lịch Sóc Vọng (mặc định)</div>
                ${socHtml}
            </div>
            <div class="now-card tiet">
                <div class="now-card-label">☀️ Lịch Tiết Khí (Nguyệt Lệnh thật)</div>
                ${tietHtml}
            </div>
            ${diffHtml}
        </div>`;
}

// =========================================================
//  GENERATE CALENDAR
// =========================================================
function generateCalendar() {
    const month = parseInt(document.getElementById('month').value);
    const year  = parseInt(document.getElementById('year').value);
    const calDiv = document.getElementById('calendar');

    if (isNaN(year) || year < 1900 || year > 2100) {
        calDiv.innerHTML = '<p style="color:var(--red);padding:16px;font-weight:600;">Vui lòng nhập năm từ 1900 đến 2100.</p>';
        return;
    }

    const daysInMonth = new Date(year, month, 0).getDate();
    const firstDay    = new Date(year, month - 1, 1).getDay();

    const monthNames = ['','Tháng Một','Tháng Hai','Tháng Ba','Tháng Tư','Tháng Năm','Tháng Sáu',
                        'Tháng Bảy','Tháng Tám','Tháng Chín','Tháng Mười','Tháng Mười Một','Tháng Mười Hai'];

    const tietKhiNotes = buildTietKhiNotes(year, month);

    let tableHTML = `
    <table>
        <thead><tr><th>CN</th><th>T.2</th><th>T.3</th><th>T.4</th><th>T.5</th><th>T.6</th><th>T.7</th></tr></thead>
        <tbody>`;

    let day = 1, row = '<tr>', cellCount = 0;
    for (let i = 0; i < firstDay; i++) { row += '<td></td>'; cellCount++; }
    while (day <= daysInMonth) {
        row += getDayCell(year, month, day);
        cellCount++; day++;
        if (cellCount === 7) { tableHTML += row + '</tr>'; row = '<tr>'; cellCount = 0; }
    }
    if (cellCount > 0) {
        while (cellCount < 7) { row += '<td></td>'; cellCount++; }
        tableHTML += row + '</tr>';
    }
    tableHTML += '</tbody></table>';

    calDiv.innerHTML = `
        <div class="calendar-card">
            <div class="calendar-month-header">
                <h3>${monthNames[month]} ${year}</h3>
                <span>Lịch Âm Dương</span>
            </div>
            ${tableHTML}
        </div>
        ${tietKhiNotes}
    `;

    displayImportantDays(year, month);
    displayThienXaDays(year, month);
}

function buildTietKhiNotes(year, month) {
    const terms = getSolarTermsForMonth(year, month);
    if (terms.length === 0) {
        return `<div class="tietKhi-section">
            <h4>Tiết Khí Tháng Này</h4>
            <p class="tietKhi-unavail">Chưa có dữ liệu Tiết Khí cho năm ${year}. Dữ liệu có sẵn: 1950–2050.</p>
        </div>`;
    }
    const pad = n => String(n).padStart(2,'0');
    const listItems = terms.map(t =>
        `<li><span class="tk-name">${t.name}</span><span>—</span>
            <span>${pad(t.day)}/${pad(month)}/${year}</span>
            <span class="tk-time">${t.time} (ICT)</span></li>`
    ).join('');
    return `<div class="tietKhi-section">
        <h4>Tiết Khí Tháng Này</h4>
        <ul class="tietKhi-list">${listItems}</ul>
    </div>`;
}

function getDayCell(year, month, day) {
    const soc = getSocVongInfo(year, month, day);
    let lunarDisp = '?', lunarDay = 'N/A', canChiDay = 'N/A', canChiMonth = 'N/A', canChiYear = 'N/A';
    if (soc) {
        lunarDisp = soc.lunarDisp; lunarDay = soc.lunarDay;
        canChiDay = soc.ngayCC; canChiMonth = soc.thangCC; canChiYear = soc.namCC;
    }

    const tietKhi = getTietKhiForDay(year, month, day) || null;

    const weekday = new Date(year, month - 1, day).getDay();
    const now = new Date();
    const isToday = (day === now.getDate() && month === now.getMonth()+1 && year === now.getFullYear());

    let cls = '';
    if (weekday === 0) cls = 'sunday';
    if (weekday === 6) cls = 'saturday';
    if (isToday) cls += ' today';

    const tietKhiTag = tietKhi ? `<span class="day-tietKhi">${tietKhi}</span>` : '';
    const safeCC = s => s.replace(/'/g,"&#39;");

    return `<td class="${cls.trim()}" onclick="showDayDetail(${year},${month},${day},'${safeCC(lunarDay)}','${safeCC(canChiDay)}','${safeCC(canChiMonth)}','${safeCC(canChiYear)}')">
        <div class="day-cell-inner">
            <span class="day-solar">${day}</span>
            <span class="day-lunar">${lunarDisp}</span>
            ${tietKhiTag}
        </div>
    </td>`;
}

// =========================================================
//  SHOW DAY DETAIL MODAL — song song Sóc Vọng & Tiết Khí
//  + khối "Lập Quẻ Ngũ Linh" (tích hợp qua ngulinh-engine.js)
// =========================================================
function showDayDetail(year, month, day, lunarDay, canChiDay, canChiMonth, canChiYear) {
    const weekdays = ['Chủ Nhật','Thứ Hai','Thứ Ba','Thứ Tư','Thứ Năm','Thứ Sáu','Thứ Bảy'];
    const wd = weekdays[new Date(year, month-1, day).getDay()];
    const pad = n => String(n).padStart(2,'0');
    const tietKhiExact = getTietKhiForDay(year, month, day);

    // Tiết Khí lúc 12:00 trưa ngày này (đại diện) — nếu ngày này có giao Tiết
    // thì sẽ có transition riêng hiển thị bên dưới.
    const tietNoon = getTietKhiThangNam(ictInstant(year, month, day, 12, 0));
    const transition = getTietTransitionOnDay(year, month, day);

    let tietBlock = '<p class="empty-note">Ngoài phạm vi dữ liệu Tiết Khí (1950–2050).</p>';
    if (tietNoon) {
        tietBlock = `
            <div class="detail-grid">
                <span class="lbl">Can Chi Ngày</span><span class="val canchi">${canChiDay}</span>
                <span class="lbl">Can Chi Tháng</span><span class="val canchi">${tietNoon.thangCanChi.text}</span>
                <span class="lbl">Can Chi Năm</span><span class="val canchi">${tietNoon.namCanChi.text}</span>
                <span class="lbl">Tiết hiện hành</span><span class="val tietKhi-val">${tietNoon.tietHienHanh}</span>
            </div>`;
    }

    let transitionBlock = '';
    if (transition) {
        transitionBlock = `<div class="transition-note">
            🔀 <b>Ngày giao Tiết "${transition.tietTen}"</b> lúc ${transition.gioGiao} (ICT).<br>
            Trước ${transition.gioGiao}: tháng <b>${transition.thangTruoc}</b>, năm <b>${transition.namTruoc}</b>.<br>
            Từ ${transition.gioGiao} trở đi: tháng <b>${transition.thangSau}</b>, năm <b>${transition.namSau}</b>${transition.doiNam ? ' <b>(sang năm Can Chi mới)</b>' : ''}.
        </div>`;
    }

    // --- Lưu lại ngày đang xem để nút "Lập Quẻ Ngũ Linh" sử dụng ---
    window.__nlSelectedDate = { year, month, day, canChiNgay: canChiDay };

    const nguLinhBlock = `
        <div class="detail-section-label" style="color:var(--violet)">🔮 Ngũ Linh</div>
        <div class="form-section" style="margin-bottom:0;">
            <label>Chọn giờ để lập quẻ</label>
            <div class="form-row">
                <select id="gioChiSelect" style="flex:1">${NL_renderGioSelectHtml()}</select>
            </div>
        </div>
        <button class="btn-primary" style="width:100%;background:var(--violet);margin-top:10px"
                onclick="window.NguLinhEngine && NguLinhEngine.layQue()">🔮 Ngũ Linh Dụng Sự</button>
    `;

    document.getElementById('modal-detail-content').innerHTML = `
        <div class="detail-date-badge">
            ${day}
            <small>${wd}, ${pad(day)}/${pad(month)}/${year}</small>
        </div>

        <div class="detail-section-label soc">🌙 Lịch Sóc Vọng (mặc định)</div>
        <div class="detail-grid">
            <span class="lbl">Âm lịch</span><span class="val highlight">${lunarDay}</span>
            <span class="lbl">Can Chi Ngày</span><span class="val canchi">${canChiDay}</span>
            <span class="lbl">Can Chi Tháng</span><span class="val canchi">${canChiMonth}</span>
            <span class="lbl">Can Chi Năm</span><span class="val canchi">${canChiYear}</span>
            <span class="lbl">Tiết khí (nếu rơi đúng ngày)</span>
            <span class="val ${tietKhiExact ? 'tietKhi-val' : ''}">${tietKhiExact || '— không có'}</span>
        </div>

        <div class="detail-section-label tiet">☀️ Lịch Tiết Khí (Nguyệt Lệnh thật, tính lúc 12:00 trưa)</div>
        ${tietBlock}
        ${transitionBlock}

        ${nguLinhBlock}
    `;
    document.getElementById('dayModal').classList.add('active');
}

// =========================================================
//  IMPORTANT DAYS
// =========================================================
const importantDaysDB = {
    2025: {
        1:  ["01/01: Tết Dương Lịch"],
        2:  ["29/01: Giao thừa Ất Tỵ","01/02: Mùng 1 Tết Nguyên Đán","05/02: Mùng 5 (Khai hạ)"],
        3:  [],
        4:  ["07/04: Giỗ Tổ Hùng Vương (âm 10/3)","30/04: Ngày Giải phóng"],
        5:  ["01/05: Ngày Quốc tế Lao động","19/05: Sinh nhật Bác Hồ"],
        6:  [],
        7:  ["27/07: Ngày Thương binh Liệt sĩ"],
        8:  [],
        9:  ["02/09: Quốc khánh Việt Nam"],
        10: [],
        11: [],
        12: ["22/12: Ngày Quân đội Nhân dân","25/12: Giáng sinh"]
    }
};
async function fetchImportantDays(year, month) { return (importantDaysDB[year] && importantDaysDB[year][month]) || []; }
async function displayImportantDays(year, month) {
    const listEl = document.getElementById('importantDaysList');
    const days = await fetchImportantDays(year, month);
    if (days.length === 0) { listEl.innerHTML = '<p class="empty-note">Không có ngày quan trọng trong tháng này.</p>'; return; }
    listEl.innerHTML = '<ul class="info-list">' + days.map(d => `<li><span class="dot dot-gold"></span>${d}</li>`).join('') + '</ul>';
}

// =========================================================
//  THIÊN XÁ
// =========================================================
function getSeason(lunarMonth) {
    if ([1,2,3].includes(lunarMonth)) return 'Xuân';
    if ([4,5,6].includes(lunarMonth)) return 'Hạ';
    if ([7,8,9].includes(lunarMonth)) return 'Thu';
    if ([10,11,12].includes(lunarMonth)) return 'Đông';
    return null;
}
function isThienXaDay(canChiDay, season) {
    const rules = { Xuân:'Mậu Dần', Hạ:'Giáp Ngọ', Thu:'Mậu Thân', Đông:'Giáp Tý' };
    return canChiDay === rules[season];
}
function findThienXaDays(year, month) {
    const days = [];
    const daysInMonth = new Date(year, month, 0).getDate();
    const pad = n => String(n).padStart(2,'0');
    for (let d = 1; d <= daysInMonth; d++) {
        try {
            const sd = new LunarDateLib.SolarDate({ day:d, month, year });
            const ld = sd.toLunarDate();
            ld.init();
            const season = getSeason(ld.month);
            const cc = ld.getDayName();
            if (season && isThienXaDay(cc, season)) {
                days.push({ solar:`${pad(d)}/${pad(month)}/${year}`, lunar:`${pad(ld.day)}/${pad(ld.month)}${ld.leap ? ' nhuận' : ''}`, canChi: cc, season });
            }
        } catch(e) {}
    }
    return days;
}
function displayThienXaDays(year, month) {
    const el = document.getElementById('thienXaDaysList');
    const txDays = findThienXaDays(year, month);
    if (txDays.length === 0) { el.innerHTML = '<p class="empty-note">Không có ngày Thiên Xá trong tháng này.</p>'; return; }
    el.innerHTML = txDays.map(tx => `
        <div class="thienxa-item">
            <div class="tx-date">✨ ${tx.solar} — ${tx.season}</div>
            <div class="tx-detail">Âm: ${tx.lunar} · Can Chi: ${tx.canChi}</div>
        </div>`).join('');
}

// =========================================================
//  TÍNH SỐ NGÀY / TÌM THỜI ĐIỂM
// =========================================================
function calculateDate() {
    const day = parseInt(document.getElementById('startDay').value);
    const mon = parseInt(document.getElementById('startMonth').value);
    const yr  = parseInt(document.getElementById('startYear').value);
    const n   = parseInt(document.getElementById('numDays').value);
    const res = document.getElementById('calcResult');
    if ([day,mon,yr,n].some(isNaN)) { res.className='calc-result err'; res.innerHTML='Vui lòng nhập đầy đủ thông tin hợp lệ.'; return; }
    const start = new Date(yr, mon-1, day);
    const result = new Date(start.getTime() + n * 86400000);
    const pad = x => String(x).padStart(2,'0');
    const fmtIn = `${pad(day)}.${pad(mon)}.${yr}`;
    const fmtOut = `${pad(result.getDate())}.${pad(result.getMonth()+1)}.${result.getFullYear()}`;
    const dir = n >= 0 ? `đếm tới ${Math.abs(n)} ngày` : `đếm lùi ${Math.abs(n)} ngày`;
    res.className = 'calc-result ok';
    res.innerHTML = `Từ <span class="highlight-date">${fmtIn}</span> ${dir} → <span class="highlight-date">${fmtOut}</span>`;
}
function calculateDaysBetween() {
    const d1=parseInt(document.getElementById('date1Day').value), m1=parseInt(document.getElementById('date1Month').value), y1=parseInt(document.getElementById('date1Year').value);
    const d2=parseInt(document.getElementById('date2Day').value), m2=parseInt(document.getElementById('date2Month').value), y2=parseInt(document.getElementById('date2Year').value);
    const res = document.getElementById('findResult');
    if ([d1,m1,y1,d2,m2,y2].some(isNaN)) { res.className='calc-result err'; res.innerHTML='Vui lòng nhập đầy đủ thông tin hợp lệ.'; return; }
    const pad = x => String(x).padStart(2,'0');
    const date1 = new Date(y1,m1-1,d1), date2 = new Date(y2,m2-1,d2);
    const diff = Math.floor(Math.abs(date2-date1)/86400000);
    res.className = 'calc-result ok';
    res.innerHTML = `Giữa <span class="highlight-date">${pad(d1)}.${pad(m1)}.${y1}</span> và <span class="highlight-date">${pad(d2)}.${pad(m2)}.${y2}</span> là <strong>${diff}</strong> ngày.`;
}

// =========================================================
//  TRA CỨU TIẾT KHÍ THEO NĂM (nút "tham khảo")
// =========================================================
function openTietKhiYearModal(presetYear) {
    openModal('tietKhiYearModal');
    const input = document.getElementById('tkYearInput');
    input.value = presetYear || currentRealYear();
    renderTietKhiYear();
}
function renderTietKhiYear() {
    const year = parseInt(document.getElementById('tkYearInput').value);
    const content = document.getElementById('tkYearContent');
    if (isNaN(year)) { content.innerHTML = '<p class="tietKhi-unavail">Nhập năm hợp lệ.</p>'; return; }
    if (!solarTermsDB[year]) {
        content.innerHTML = `<p class="tietKhi-unavail">Chưa có dữ liệu Tiết Khí cho năm ${year}. Dữ liệu có sẵn: 1950–2050.</p>`;
        return;
    }
    const seasons = [
        { label:'Mùa Xuân (Th.1–3)', months:[1,2,3] },
        { label:'Mùa Hạ (Th.4–6)',   months:[4,5,6] },
        { label:'Mùa Thu (Th.7–9)',  months:[7,8,9] },
        { label:'Mùa Đông (Th.10–12)', months:[10,11,12] }
    ];
    const pad = n => String(n).padStart(2,'0');
    let html = `<div class="detail-section-label tiet" style="margin-top:4px">Tiết Khí năm ${year}</div>`;
    seasons.forEach(s => {
        const items = [];
        s.months.forEach(m => {
            (solarTermsDB[year][m] || []).forEach(t => {
                items.push(`<li><span class="yr-name">${t.name}</span><span class="yr-time">${pad(t.day)}/${pad(m)}/${year} — ${t.time}</span></li>`);
            });
        });
        if (items.length) {
            html += `<div class="year-ref-season"><h5>${s.label}</h5><ul class="year-ref-list">${items.join('')}</ul></div>`;
        }
    });
    content.innerHTML = html;
}

// =========================================================
//  NL_* — CẦU NỐI DỮ LIỆU CHO NGŨ LINH ENGINE
//  (Các file thuật toán KHÔNG gọi trực tiếp các hàm này; chúng chỉ
//   nhận dữ liệu qua "ctx" do ngulinh-engine.js truyền vào run(ctx).
//   Các hàm dưới đây chỉ được ngulinh-engine.js sử dụng.)
// =========================================================

// 12 khung giờ Chi truyền thống + khoảng giờ dương lịch tương ứng
const NL_GIO_LIST = [
    { chi:'Tý',   label:'23:00–00:59' },
    { chi:'Sửu',  label:'01:00–02:59' },
    { chi:'Dần',  label:'03:00–04:59' },
    { chi:'Mão',  label:'05:00–06:59' },
    { chi:'Thìn', label:'07:00–08:59' },
    { chi:'Tỵ',   label:'09:00–10:59' },
    { chi:'Ngọ',  label:'11:00–12:59' },
    { chi:'Mùi',  label:'13:00–14:59' },
    { chi:'Thân', label:'15:00–16:59' },
    { chi:'Dậu',  label:'17:00–18:59' },
    { chi:'Tuất', label:'19:00–20:59' },
    { chi:'Hợi',  label:'21:00–22:59' }
];
const NL_GIO_START_HOUR = { 'Tý':23,'Sửu':1,'Dần':3,'Mão':5,'Thìn':7,'Tỵ':9,'Ngọ':11,'Mùi':13,'Thân':15,'Dậu':17,'Tuất':19,'Hợi':21 };

function NL_renderGioSelectHtml() {
    const opts = NL_GIO_LIST.map(g => `<option value="${g.chi}">${g.chi} (${g.label})</option>`).join('');
    return `<option value="">-- Chọn giờ --</option>` + opts;
}

// Ngũ Thử Độn: Can của giờ Tý theo Can của Ngày
function stemOfTyFromDayCan(dayCanIdx) {
    return (2 * (dayCanIdx % 5)) % 10;
}

function NL_getGioCanChi(canChiNgayText, chi) {
    if (!canChiNgayText || !chi) return null;
    const dayCan = canChiNgayText.split(' ')[0];
    const dayCanIdx = THIEN_CAN.indexOf(dayCan);
    if (dayCanIdx === -1) return null;
    const stemTy = stemOfTyFromDayCan(dayCanIdx);
    const offset = DIA_CHI_CHUAN.indexOf(chi); // DIA_CHI_CHUAN bắt đầu từ Tý = 0
    if (offset === -1) return null;
    const canIdx = (stemTy + offset) % 10;
    return THIEN_CAN[canIdx] + ' ' + chi;
}

/**
 * Dựng đối tượng ngữ cảnh (ctx) đầy đủ cho 1 thời điểm Ngày+Giờ, để truyền
 * cho các thuật toán Ngũ Linh (xem cấu trúc ctx trong ngulinh-engine.js).
 */
function NL_getDayContext(year, month, day, chi) {
    const weekdays = ['Chủ Nhật','Thứ Hai','Thứ Ba','Thứ Tư','Thứ Năm','Thứ Sáu','Thứ Bảy'];
    const thu = weekdays[new Date(year, month-1, day).getDay()];
    const soc = getSocVongInfo(year, month, day);

    // Dùng giữa khung giờ được chọn để tra Tiết Khí (đủ chính xác cho việc
    // xác định tháng/năm Tiết Khí; sai số chỉ đáng kể nếu đúng thời điểm
    // giao Tiết rơi vào giữa khung giờ đó).
    const startHour = chi ? (NL_GIO_START_HOUR[chi] ?? 12) : 12;
    const probeHour = (startHour + 1) % 24;
    const tietObj = getTietKhiThangNam(ictInstant(year, month, day, probeHour, 0));

    const canChiNgay = soc ? soc.ngayCC : null;
    const gio = chi ? {
        chi: chi,
        canChi: NL_getGioCanChi(canChiNgay, chi),
        khoangGio: (NL_GIO_LIST.find(g => g.chi === chi) || {}).label || ''
    } : null;

    return {
        duong: { ngay: day, thang: month, nam: year, thu: thu },
        socVong: soc ? {
            amLich: soc.lunarDay,
            canChiNgay: soc.ngayCC,
            canChiThang: soc.thangCC,
            canChiNam: soc.namCC
        } : null,
        tietKhi: tietObj ? {
            tietHienHanh: tietObj.tietHienHanh,
            canChiThang: tietObj.thangCanChi.text,
            canChiNam: tietObj.namCanChi.text
        } : null,
        gio: gio
    };
}

// =========================================================
//  INIT
// =========================================================
(function init() {
    const now = new Date();
    document.getElementById('month').value = now.getMonth() + 1;
    document.getElementById('year').value  = now.getFullYear();
    renderNowBanner();
    generateCalendar();
    setInterval(renderNowBanner, 60000);
})();
