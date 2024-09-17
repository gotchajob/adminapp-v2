export const shadeColor = (hex: string, percent: number) => {
  // Xóa dấu # nếu có
  hex = hex.replace(/^\s*#|\s*$/g, '');

  // Nếu mã hex có 3 ký tự, chuyển thành 6 ký tự
  if (hex.length === 3) {
    hex = hex.replace(/(.)/g, '$1$1');
  }

  // Chuyển mã hex sang giá trị số nguyên
  let r: any = parseInt(hex.substring(0, 2), 16);
  let g: any = parseInt(hex.substring(2, 4), 16);
  let b: any = parseInt(hex.substring(4, 6), 16);

  // Tính toán giá trị mới cho mỗi kênh màu
  r = Math.round((r * (100 + percent)) / 100);
  g = Math.round((g * (100 + percent)) / 100);
  b = Math.round((b * (100 + percent)) / 100);

  // Đảm bảo giá trị nằm trong khoảng từ 0 đến 255
  r = r < 255 ? r : 255;
  g = g < 255 ? g : 255;
  b = b < 255 ? b : 255;

  // Chuyển lại giá trị màu sang định dạng hex
  r = ('0' + r.toString(16)).slice(-2);
  g = ('0' + g.toString(16)).slice(-2);
  b = ('0' + b.toString(16)).slice(-2);

  return `#${r}${g}${b}`;
};
