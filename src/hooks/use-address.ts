import { useEffect, useState } from "react";

export interface AddressData {
  name: string;
  idProvince: string;
  idDistrict: string;
}

export const useGetProvince = () => {
  const [provinceOptions, setProvinceOptions] = useState<AddressData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const getProvinceOption = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        "https://api-tinh-thanh-git-main-toiyours-projects.vercel.app/province"
      );
      const cities = await response.json();
      setProvinceOptions(cities);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getProvinceOption();
  }, []);
  return {
    provinceOptions,
    isLoading,
  };
};

export const useGetDistrict = (
  provinceCode: string,
) => {
  const [districtOptions, setDistrictOptions] = useState<AddressData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const getDistrictOption = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://api-tinh-thanh-git-main-toiyours-projects.vercel.app/district?idProvince=${provinceCode}`
      );
      const districts = await response.json();
      setDistrictOptions(districts);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getDistrictOption();
  }, [provinceCode]);
  return {
    districtOptions,
    isLoading,
  };
};

export const useGetWard = (districtCode: string) => {
  const [wardOptions, setWardOptions] = useState<AddressData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const getWardOption = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://api-tinh-thanh-git-main-toiyours-projects.vercel.app/commune?idDistrict=${districtCode}`
      );
      const wards = await response.json();
      setWardOptions(wards);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getWardOption();
  }, [districtCode]);
  return {
    wardOptions,
    isLoading,
  };
};

export const useGetCountry = () => {
  const [countries, setCountries] = useState<string[]>([]);
  const getCountries = async () => {
    try {
      const res = await fetch("/api/countries");
      const data = await res.json();
      setCountries(data.data);
    } catch (error) {}
  };

  useEffect(() => {
    getCountries();
  }, []);
  return {
    countries,
  };
};
