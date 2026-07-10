import uuid


def create_user_and_login(client, role="employee"):
    username = f"user_{uuid.uuid4().hex[:8]}"
    email = f"{uuid.uuid4()}@example.com"
    password = "Password@123"

    register = client.post(
        "/users/register",
        json={
            "username": username,
            "email": email,
            "password": password,
            "role": role
        }
    )

    assert register.status_code == 200

    login = client.post(
        "/users/login",
        data={
            "username": email,
            "password": password
        }
    )

    assert login.status_code == 200

    token = login.json()["access_token"]

    return token


def test_users_me(client):
    token = create_user_and_login(client)

    response = client.get(
        "/users/me",
        headers={
            "Authorization": f"Bearer {token}"
        }
    )

    assert response.status_code == 200

    body = response.json()

    assert "email" in body
    assert "username" in body
    assert body["role"] == "employee"


def test_users_me_without_token(client):
    response = client.get("/users/me")

    assert response.status_code == 401


def test_admin_endpoint_as_admin(client):
    token = create_user_and_login(client, role="admin")

    response = client.get(
        "/users/admin",
        headers={
            "Authorization": f"Bearer {token}"
        }
    )

    assert response.status_code == 200


def test_admin_endpoint_as_employee(client):
    token = create_user_and_login(client, role="employee")

    response = client.get(
        "/users/admin",
        headers={
            "Authorization": f"Bearer {token}"
        }
    )

    assert response.status_code == 403