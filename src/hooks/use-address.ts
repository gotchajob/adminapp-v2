import { useEffect, useState } from 'react';

export interface AddressData {
  name: string;
  idProvince: string;
  idDistrict: string;
}

export const useGetProvince = () => {
  const [provinceOptions, setProvinceOptions] = useState<AddressData[]>([]);
  const getProvinceOption = async () => {
    try {
      const response = await fetch('https://api-tinh-thanh-git-main-toiyours-projects.vercel.app/province');
      const cities = await response.json();
      setProvinceOptions(cities);
    } catch (error) {}
  };
  useEffect(() => {
    getProvinceOption();
  }, []);
  return {
    provinceOptions
  };
};

export const useGetDistrict = (provinceCode: string) => {
  const [districtOptions, setDistrictOptions] = useState<AddressData[]>([]);
  const getDistrictOption = async () => {
    try {
      console.log(provinceCode);
      const response = await fetch(`https://api-tinh-thanh-git-main-toiyours-projects.vercel.app/district?idProvince=${provinceCode}`);
      const districts = await response.json();
      setDistrictOptions(districts);
    } catch (error) {}
  };

  useEffect(() => {
    getDistrictOption();
  }, [provinceCode]);
  return {
    districtOptions
  };
};

export const useGetWard = (districtCode: string) => {
  const [wardOptions, setWardOptions] = useState<AddressData[]>([]);
  const getWardOption = async () => {
    try {
      const response = await fetch(`https://api-tinh-thanh-git-main-toiyours-projects.vercel.app/commune?idDistrict=${districtCode}`);
      const wards = await response.json();
      setWardOptions(wards);
    } catch (error) {}
  };

  useEffect(() => {
    getWardOption();
  }, [districtCode]);
  return {
    wardOptions
  };
};

export const useGetCountry = () => {
  const [countries, setCountries] = useState<string[]>([]);
  const getCountries = async () => {
    try {
      const res = await fetch('/api/countries');
      const data = await res.json();
      setCountries(data.data);
    } catch (error) {}
  };

  useEffect(() => {
    getCountries();
  }, []);
  return {
    countries
  };
};
