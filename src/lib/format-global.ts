export const formatGender = (gender: string) => {
    if (gender === 'male') return 'Nam';
    if (gender === 'female') return 'Nữ';
    if (gender === 'orther') return 'Giới tính thứ 3';
};

export const formatRole = (role: string) => {
    if (role === 'admin') return 'ADMIN';
    if (role === 'doctor') return 'Bác sĩ';
    if (role === 'staff') return 'Nhân viên';
    if (role === 'manager') return 'Quản lý';
    if (role === 'intern') return 'Thực tập sinh';
};
