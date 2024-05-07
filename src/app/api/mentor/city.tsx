const apiProinces = 'https://vnprovinces.pythonanywhere.com/api/provinces/'
const apiDistrict = 'https://vnprovinces.pythonanywhere.com/api/districts/'

export const fetchProvinceDetailData = async (provinceId: string): Promise<any> => {
    const response = await fetch(`${apiProinces}${provinceId}`);
    if (!response.ok) {
        throw new Error('Failed to fetch province data');
    }
    const json = await response.json();
    return json.districts;
}

export const fetchDistrictData = async (districtId: string): Promise<any> => {
    const response = await fetch(`${apiDistrict}${districtId}`);
    if (!response.ok) {
        throw new Error('Failed to fetch district data');
    }
    const json = await response.json();
    return json.wards;
}

export const fetchProvinceData = async (): Promise<any> => {
    const response = await fetch(`${apiDistrict}?basic=true&limit=100`);
    if (!response.ok) {
        throw new Error('Failed to fetch district data');
    }
    const json = await response.json();
    return json.wards;
}

