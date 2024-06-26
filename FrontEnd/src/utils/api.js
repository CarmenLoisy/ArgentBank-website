import PropTypes from "prop-types";

const BASE_URL = "http://localhost:3001/api/v1/";
const ERROR_MESSAGE = "Error. Please retry later.";

// Function to handle fetched accounts data
export function getAccountsData(data) {
    if (data) {
        if (data !== undefined) {
            const obj = {
                accounts: data.accounts,
                status: data.status,
                message: data.message,
            };
            return obj;
        } else {
            const obj = {
                accounts: [],
                status: 0,
                message: "No accounts found",
            };
            return obj;
        }
    }
}

getAccountsData.propTypes = {
    data: PropTypes.object.isRequired,
};

// Function to handle fetched transactions data
export function getTransactionsData(data) {
    if (data) {
        if (data.transactions !== undefined) {
            const obj = {
                transactions: data.transactions,
                status: data.status,
                message: data.message,
            };
            return obj;
        } else {
            const obj = {
                transactions: [],
                status: 0,
                message: "No transactions found",
            };
            return obj;
        }
    }
}

getTransactionsData.propTypes = {
    data: PropTypes.object.isRequired,
};

// Function to handle fetched transaction by ID data
export function getTransactionByIdData(data) {
    if (data) {
        if (data !== undefined) {
            const obj = {
                transaction: data,
                status: data.status,
                message: data.message,
            };
            return obj;
        } else {
            const obj = {
                transaction: null,
                status: 0,
                message: "Transaction not found",
            };
            return obj;
        }
    }
}

getTransactionByIdData.propTypes = {
    data: PropTypes.object.isRequired,
};

// Function to handle updated transaction data
export function updateTransactionData(data) {
    if (data) {
        if (data.status !== 400 && data.status !== 401 && data.status !== 500) {
            const obj = {
                status: data.status,
                message: data.message,
            };
            return obj;
        } else {
            const obj = {
                status: data.status,
                message: data.message,
            };
            return obj;
        }
    }
}

updateTransactionData.propTypes = {
    data: PropTypes.object.isRequired,
};

// Function to fetch all user accounts via the API
export const getAccounts = async (token) => {
    const API_URL = `${BASE_URL}user/profile/accounts`;

    try {
        const accountsResponse = await fetch(API_URL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        if (!accountsResponse.ok) {
            throw new Error(`HTTP error! status: ${accountsResponse.status}`);
        }
        const accountsResponseJson = await accountsResponse.json();
        return getAccountsData(accountsResponseJson);
    } catch (error) {
        alert(ERROR_MESSAGE);
        return null;
    }
};

getAccounts.propTypes = {
    token: PropTypes.string.isRequired,
};

// Function to fetch all transactions for the current month via the API
export const getTransactions = async (token, accountId, currentMonth) => {
    const API_URL = `${BASE_URL}user/profile/${accountId}/transactions/${currentMonth}`;

    try {
        const transactionsResponse = await fetch(API_URL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        if (!transactionsResponse.ok) {
            throw new Error(`HTTP error! status: ${transactionsResponse.status}`);
        }
        const transactionsResponseJson = await transactionsResponse.json();
        return getTransactionsData(transactionsResponseJson);
    } catch (error) {
        alert(ERROR_MESSAGE);
        return null;
    }
};

getTransactions.propTypes = {
    token: PropTypes.string.isRequired,
    accountId: PropTypes.string.isRequired,
    currentMonth: PropTypes.string.isRequired,
};

// Function to fetch a transaction by ID via the API
export const getTransactionById = async (token, accountId, transactionId) => {
    const API_URL = `${BASE_URL}user/profile/${accountId}/transactions/${transactionId}`;

    try {
        const transactionResponse = await fetch(API_URL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        if (!transactionResponse.ok) {
            throw new Error(`HTTP error! status: ${transactionResponse.status}`);
        }
        const transactionResponseJson = await transactionResponse.json();
        return getTransactionByIdData(transactionResponseJson);
    } catch (error) {
        alert(ERROR_MESSAGE);
        return null;
    }
};

getTransactionById.propTypes = {
    token: PropTypes.string.isRequired,
    accountId: PropTypes.string.isRequired,
    transactionId: PropTypes.string.isRequired,
};

// Function to update a transaction via the API
export const updateTransaction = async (token, accountId, transactionId, transactionDetails) => {
    const API_URL = `${BASE_URL}user/profile/${accountId}/transactions/${transactionId}`;

    try {
        const updateTransactionResponse = await fetch(API_URL, {
            method: "PUT",
            body: JSON.stringify(transactionDetails),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        if (!updateTransactionResponse.ok) {
            throw new Error(`HTTP error! status: ${updateTransactionResponse.status}`);
        }
        const updateTransactionResponseJson = await updateTransactionResponse.json();
        return updateTransactionData(updateTransactionResponseJson);
    } catch (error) {
        alert(ERROR_MESSAGE);
        return null;
    }
};

updateTransaction.propTypes = {
    token: PropTypes.string.isRequired,
    accountId: PropTypes.string.isRequired,
    transactionId: PropTypes.string.isRequired,
    transactionDetails: PropTypes.object.isRequired,
};
