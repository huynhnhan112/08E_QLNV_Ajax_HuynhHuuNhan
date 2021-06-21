//-------------------------------------------GET------------------------------------------------------
function layDanhSachNhanVienApi () {
    var promise = axios({
        url: `http://svcy.myclass.vn/api/QuanLyNhanVienApi/LayDanhSachNhanVien`,
        method: 'GET',
        responseType: 'json'
    })

    promise.then(function(result){
        console.log('result', result.data);
        renderTableNhanVien(result.data);
    })

    promise.catch(function(error){
        console.log('error', error.response.data);
    })
}

layDanhSachNhanVienApi();

function renderTableNhanVien (arrNV) {
    var content = '';
    for(var index = 0; index < arrNV.length; index++){
        var nv = arrNV[index];

        //Gọi lại hàm NhanVien để có function
        var nhanVien = new NhanVien();
        nhanVien.maNhanVien = nv.maNhanVien;
        nhanVien.tenNhanVien = nv.tenNhanVien;
        nhanVien.chucVu = nv.chucVu;
        nhanVien.heSoChucVu = nv.heSoChucVu;
        nhanVien.luongCoBan = nv.luongCoBan;
        nhanVien.soGioLamTrongThang = nv.soGioLamTrongThang;

        var trNhanVien = `
        <tr>
            <td>${nhanVien.maNhanVien}</td>
            <td>${nhanVien.tenNhanVien}</td>
            <td>${nhanVien.chucVu}</td>
            <td>${nhanVien.luongCoBan}</td>
            <td>${nhanVien.tongLuong()}</td>
            <td>${nhanVien.soGioLamTrongThang}</td>
            <td>${nhanVien.xepLoaiNhanVien()}</td>
            <td>
                <button onclick="xoaNhanVien('${nhanVien.maNhanVien}')" class="btn btn-danger">Xóa</button>
                <button onclick="chinhSuaNhanVien('${nhanVien.maNhanVien}')" class="btn btn-primary ml-2">Chỉnh sửa</button>
            </td>
        </tr>
        `;
        content += trNhanVien;
    }

    document.querySelector('#tblBody').innerHTML = content;
}


//-------------------------------------------POST------------------------------------------------------
document.querySelector('#btnThemNhanVien').onclick = function () {
    var nhanVien = new NhanVien();
    nhanVien.maNhanVien = document.querySelector('#maNhanVien').value;
    nhanVien.tenNhanVien = document.querySelector('#tenNhanVien').value;
    nhanVien.chucVu = document.querySelector('#chucVu').value;
    nhanVien.heSoChucVu = document.querySelector('#chucVu').value;
    nhanVien.luongCoBan = document.querySelector('#luongCoBan').value;
    nhanVien.soGioLamTrongThang = document.querySelector('#soGioLamTrongThang').value;

    console.log('nhan vien', nhanVien);
    
    //Gửi dữ liệu về server
    
    var promise = axios({
        url: `http://svcy.myclass.vn/api/QuanLyNhanVienApi/ThemNhanVien`,
        method: 'POST',
        data: nhanVien
    })
    
    promise.then(function(result){
        console.log('result', result.data);
        layDanhSachNhanVienApi();
    })
    
    promise.catch(function(error){
        console.log('error', error.response.data);
    })
}


//-------------------------------------------DELETE------------------------------------------------------
function xoaNhanVien (maNhanVien) {
    console.log('maNhanVien', maNhanVien);
    var promise = axios({
        url: `http://svcy.myclass.vn/api/QuanLyNhanVienApi/XoaNhanVien?maSinhVien=${maNhanVien}`,
        method: 'DELETE'
    })

    promise.then(function(result){
        console.log('result', result.data);
        //Xóa thành công load lại table từ api lấy danh sách nhân viên
        layDanhSachNhanVienApi();
    })

    promise.catch(function(error){
        console.log('error', error.response.data);
    })
}


//-------------------------------------------GET------------------------------------------------------
function chinhSuaNhanVien (maNhanVien) {
    var promise = axios({
        url: `http://svcy.myclass.vn/api/QuanLyNhanVienApi/LayThongTinNhanVien?maNhanVien=${maNhanVien}`,
        method: 'GET'
    })

    promise.then(function(result){
        var nhanVien = result.data;
        // console.log(nhanVien);

        document.querySelector('#maNhanVien').value = nhanVien.maNhanVien;
        document.querySelector('#tenNhanVien').value = nhanVien.tenNhanVien;
        document.querySelector('#chucVu').value = nhanVien.chucVu;
        document.querySelector('#chucVu').value = nhanVien.heSoChucVu;
        document.querySelector('#luongCoBan').value = nhanVien.luongCoBan;
        document.querySelector('#soGioLamTrongThang').value = nhanVien.soGioLamTrongThang;

    })

    promise.catch(function(error){
        console.log('error', error.response.data);
    })
}


//-------------------------------------------PUT------------------------------------------------------
document.querySelector('#btnCapNhatNhanVien').onclick = function () {
    var nhanVienUpdate = new NhanVien();

    nhanVienUpdate.maNhanVien = document.querySelector('#maNhanVien').value;
    nhanVienUpdate.tenNhanVien = document.querySelector('#tenNhanVien').value;
    nhanVienUpdate.chucVu = document.querySelector('#chucVu').value;
    nhanVienUpdate.heSoChucVu = document.querySelector('#chucVu').value;
    nhanVienUpdate.luongCoBan = document.querySelector('#luongCoBan').value;
    nhanVienUpdate.soGioLamTrongThang = document.querySelector('#soGioLamTrongThang').value;
    console.log(nhanVienUpdate);

    var promise = axios({
        url: `http://svcy.myclass.vn/api/QuanLyNhanVienApi/CapNhatThongTinNhanVien?maNhanVien=${nhanVienUpdate.maNhanVien}`,
        method: 'PUT',
        data: nhanVienUpdate
    })

    promise.then(function(result){
        console.log('result', result.data);
        layDanhSachNhanVienApi();
    })

    promise.catch(function(error){
        console.log('error', error.response.data);
    })
}