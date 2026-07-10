import uuid


def test_register_user(client):
    username = f"user_{uuid.uuid4().hex[:8]}"
    email = f"{uuid.uuid4()}@example.com"

    response = client.post(
        "/users/register",
        json={
            "username": username,
            "email": email,
            "password": "Password@123",
            "role": "employee"
        }
    )

    assert response.status_code == 200

    data = response.json()

    assert data["username"] == username
    assert data["email"] == email
    assert data["role"] == "employee"


def test_login_user(client):
    username = f"user_{uuid.uuid4().hex[:8]}"
    email = f"{uuid.uuid4()}@example.com"

    register = client.post(
        "/users/register",
        json={
            "username": username,
            "email": email,
            "password": "Password@123",
            "role": "employee"
        }
    )

    assert register.status_code == 200

    response = client.post(
        "/users/login",
        data={
            "username": email,
            "password": "Password@123"
        }
    )

    assert response.status_code == 200

    data = response.json()

    assert "access_token" in data
    assert data["token_type"] == "bearer"


def test_duplicate_email(client):
    username1 = f"user_{uuid.uuid4().hex[:8]}"
    username2 = f"user_{uuid.uuid4().hex[:8]}"
    email = f"{uuid.uuid4()}@example.com"

    response1 = client.post(
        "/users/register",
        json={
            "username": username1,
            "email": email,
            "password": "Password@123",
            "role": "employee"
        }
    )

    assert response1.status_code == 200

    response2 = client.post(
        "/users/register",
        json={
            "username": username2,
            "email": email,
            "password": "Password@123",
            "role": "employee"
        }
    )

    assert response2.status_code == 400

    body = response2.json()

    if "message" in body:
        assert body["message"] == "Email already registered"
    else:
        assert body["detail"] == "Email already registered"


def test_invalid_login(client):
    username = f"user_{uuid.uuid4().hex[:8]}"
    email = f"{uuid.uuid4()}@example.com"

    register = client.post(
        "/users/register",
        json={
            "username": username,
            "email": email,
            "password": "Password@123",
            "role": "employee"
        }
    )

    assert register.status_code == 200

    response = client.post(
        "/users/login",
        data={
            "username": email,
            "password": "WrongPassword"
        }
    )

    assert response.status_code == 401

    body = response.json()

    if "message" in body:
        assert body["message"] == "Invalid email or password"
    else:
        assert body["detail"] == "Invalid email or password"