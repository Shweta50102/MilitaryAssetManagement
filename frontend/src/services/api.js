const API_BASE_URL = "http://localhost:8080/api";

function getAuthHeaders() {
    const credentials = sessionStorage.getItem("auth");

    return {
        Authorization: `Basic ${credentials}`
    };
}

export async function getDashboard(
    baseId = "",
    equipmentType = "",
    startDate = "",
    endDate = ""
) {

    let url = `${API_BASE_URL}/dashboard`;

    const params = new URLSearchParams();

    if (baseId) {
        params.append("baseId", baseId);
    }

    if (equipmentType) {
        params.append("equipmentType", equipmentType);
    }

    if (startDate) {
        params.append("startDate", startDate);
    }

    if (endDate) {
        params.append("endDate", endDate);
    }

    if (params.toString()) {
        url += `?${params.toString()}`;
    }

    const response = await fetch(url, {
        headers: getAuthHeaders()
    });

    if (!response.ok) {
        throw new Error("Failed to fetch dashboard data");
    }

    return response.json();
}

export async function getBases() {

    const response = await fetch(`${API_BASE_URL}/bases`, {
        headers: getAuthHeaders()
    });

    if (!response.ok) {
        throw new Error("Failed to fetch bases");
    }

    return response.json();
}

export async function getEquipment() {

    const response = await fetch(`${API_BASE_URL}/equipment`, {
        headers: getAuthHeaders()
    });

    if (!response.ok) {
        throw new Error("Failed to fetch equipment");
    }

    return response.json();
}

export async function getPurchases() {

    const response = await fetch(`${API_BASE_URL}/purchases`, {
        headers: getAuthHeaders()
    });

    if (!response.ok) {
        throw new Error("Failed to fetch purchases");
    }

    return response.json();
}

export async function getTransfers() {

    const response = await fetch(`${API_BASE_URL}/transfers`, {
        headers: getAuthHeaders()
    });

    if (!response.ok) {
        throw new Error("Failed to fetch transfers");
    }

    return response.json();
}

export async function getAssignments() {

    const response = await fetch(`${API_BASE_URL}/assignments`, {
        headers: getAuthHeaders()
    });

    if (!response.ok) {
        throw new Error("Failed to fetch assignments");
    }

    return response.json();
}

export async function getExpenditures() {

    const response = await fetch(`${API_BASE_URL}/expenditures`, {
        headers: getAuthHeaders()
    });

    if (!response.ok) {
        throw new Error("Failed to fetch expenditures");
    }

    return response.json();
}

export async function getAuditLogs() {

    const response = await fetch(`${API_BASE_URL}/audit-logs`, {
        headers: getAuthHeaders()
    });

    if (!response.ok) {
        throw new Error("Failed to fetch audit logs");
    }

    return response.json();
}

export async function getUsers() {

    const response = await fetch(`${API_BASE_URL}/users`, {
        headers: getAuthHeaders()
    });

    if (!response.ok) {
        throw new Error("Failed to fetch users");
    }

    return response.json();
}

export async function login(username, password) {

    const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    });

    if (!response.ok) {
        throw new Error("Invalid username or password");
    }

    const data = await response.json();

    return {
        ...data,
        credentials: btoa(`${username}:${password}`)
    };
}

export async function addEquipment(equipment) {

    const response = await fetch(`${API_BASE_URL}/equipment`, {
        method: "POST",
        headers: {
            ...getAuthHeaders(),
            "Content-Type": "application/json"
        },
        body: JSON.stringify(equipment)
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => null);

        throw new Error(
            errorData?.error || "Failed to add equipment"
        );
    }

    return response.json();
}


export async function deleteEquipment(id) {

    const response = await fetch(
        `${API_BASE_URL}/equipment/${id}`,
        {
            method: "DELETE",
            headers: getAuthHeaders()
        }
    );

    if (!response.ok) {
        const errorData = await response.json().catch(() => null);

        throw new Error(
            errorData?.error || "Failed to delete equipment"
        );
    }

    return response;
}

export async function addPurchase(purchase) {

    const response = await fetch(`${API_BASE_URL}/purchases`, {
        method: "POST",
        headers: {
            ...getAuthHeaders(),
            "Content-Type": "application/json"
        },
        body: JSON.stringify(purchase)
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => null);

        throw new Error(
            errorData?.error || "Failed to add purchase"
        );
    }

    return response.json();
}

export async function addTransfer(transfer) {

    const response = await fetch(`${API_BASE_URL}/transfers`, {
        method: "POST",
        headers: {
            ...getAuthHeaders(),
            "Content-Type": "application/json"
        },
        body: JSON.stringify(transfer)
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => null);

        throw new Error(
            errorData?.error || "Failed to add transfer"
        );
    }

    return response.json();
}

export async function addAssignment(assignment) {

    const response = await fetch(`${API_BASE_URL}/assignments`, {
        method: "POST",
        headers: {
            ...getAuthHeaders(),
            "Content-Type": "application/json"
        },
        body: JSON.stringify(assignment)
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => null);

        throw new Error(
            errorData?.error || "Failed to add assignment"
        );
    }

    return response.json();
}

export async function addExpenditure(expenditure) {

    const response = await fetch(`${API_BASE_URL}/expenditures`, {
        method: "POST",
        headers: {
            ...getAuthHeaders(),
            "Content-Type": "application/json"
        },
        body: JSON.stringify(expenditure)
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => null);

        throw new Error(
            errorData?.error || "Failed to add expenditure"
        );
    }

    return response.json();
}