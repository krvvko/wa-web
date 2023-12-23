import React, { useEffect, useState } from "react";
import './index.css';
import { HeaderSearchProps, HeaderSearchServerData } from "../../../utils/interfaces";
import axios, { AxiosError } from "axios";
import { config } from "../../../utils/config";

const fetchData = async (apiRoute: string, searchTerm: string): Promise<HeaderSearchServerData[] | string> => {
    apiRoute = apiRoute.toLowerCase();
    try {
        const response = await axios.get<HeaderSearchServerData[]>(`${config.serverURL}/${apiRoute}/search`, {
            params: { name: searchTerm.trim() }
        });
        return response.data;
    } catch (error) {
        const e = error as AxiosError;
        return e.message;
    }
};

const HeaderSearch: React.FC<HeaderSearchProps> = ({ apiRoute }) => {
    const [data, setData] = useState<HeaderSearchServerData[] | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');

    const debounce = (func: (...args: any[]) => void, delay: number): ((...args: any[]) => void) => {
        let timer: NodeJS.Timeout;
        return function(...args: any[]) {
            clearTimeout(timer);
            timer = setTimeout(() => {
                func(...args);
            }, delay);
        };
    };

    useEffect(() => {
        if (searchTerm.trim()) {
            const debouncedFetch = debounce((term: string) => {
                fetchData(apiRoute, term).then((fetchedData) => {
                    if (typeof fetchedData !== 'string') {
                        setData(fetchedData);
                    }
                });
            }, 500);

            debouncedFetch(searchTerm);
        } else {
            setData(null);
        }
    }, [searchTerm, apiRoute]);

    const renderContent = (): React.ReactNode => {
        if (searchTerm.trim() && data && data.length > 0) {
            return (
                <div className="header-found-container">
                    <span>Jobs found:</span>
                    <div className="found-elements">
                        {data.map((data: HeaderSearchServerData) => (
                            <a href={`#result${data.id}`}>
                                <div className="found-div">
                                    <span>Name:</span>
                                    <span>{data.name}</span>
                                </div>
                                <div className="found-div">
                                    <span>ID:</span>
                                    <span>{data.id}</span>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>)
        } else if (searchTerm.trim() && data && data.length === 0) {
            return <span className="no-results">No results found</span>;
        } else {
            return <></>;
        }
    };

    return (
        <div className="header-search-container">
            <input
                className="header-search-input"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="🔍 Search by name"
            />
            {renderContent()}
        </div>
    );
};

export default HeaderSearch;
