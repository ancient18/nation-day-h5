export const API_URL =
    process.env.NODE_ENV === 'production'
        // ? 'https://be-prod.redrock.cqupt.edu.cn/national-day'
        ? 'https://be-prod.redrock.cqupt.edu.cn/national-day/status'
        : '/api';
