import uuid


def create_user_and_get_token(client, role="admin"):
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

    return login.json()["access_token"]


def product_payload():
    return {
        "product_name": f"Shirt_{uuid.uuid4().hex[:6]}",
        "category": "Clothing",
        "brand": "Nike",
        "size": "L",
        "color": "Black",
        "price": 999.99,
        "quantity": 10,
        "image_url": None
    }


def auth_header(token):
    return {
        "Authorization": f"Bearer {token}"
    }


def test_create_product(client):

    token = create_user_and_get_token(
        client,
        role="admin"
    )

    response = client.post(
        "/products/",
        json=product_payload(),
        headers=auth_header(token)
    )

    assert response.status_code == 200

    data = response.json()

    assert "id" in data
    assert data["category"] == "Clothing"


def test_get_all_products(client):

    token = create_user_and_get_token(
        client,
        role="employee"
    )

    response = client.get(
        "/products/",
        headers=auth_header(token)
    )

    assert response.status_code == 200

    data = response.json()

    assert "data" in data
    assert "total" in data


def test_get_product_by_id(client):

    token = create_user_and_get_token(
        client,
        role="admin"
    )

    create = client.post(
        "/products/",
        json=product_payload(),
        headers=auth_header(token)
    )

    product_id = create.json()["id"]

    response = client.get(
        f"/products/{product_id}",
        headers=auth_header(token)
    )

    assert response.status_code == 200

    assert response.json()["id"] == product_id


def test_product_not_found(client):

    token = create_user_and_get_token(
        client,
        role="employee"
    )

    response = client.get(
        "/products/999999",
        headers=auth_header(token)
    )

    assert response.status_code == 404


def test_update_product(client):

    token = create_user_and_get_token(
        client,
        role="admin"
    )

    create = client.post(
        "/products/",
        json=product_payload(),
        headers=auth_header(token)
    )

    product_id = create.json()["id"]

    response = client.put(
        f"/products/{product_id}",
        json={
            "price": 1500,
            "quantity": 20
        },
        headers=auth_header(token)
    )

    assert response.status_code == 200

    data = response.json()

    assert data["price"] == 1500
    assert data["quantity"] == 20


def test_delete_product(client):

    token = create_user_and_get_token(
        client,
        role="admin"
    )

    create = client.post(
        "/products/",
        json=product_payload(),
        headers=auth_header(token)
    )

    product_id = create.json()["id"]

    response = client.delete(
        f"/products/{product_id}",
        headers=auth_header(token)
    )

    assert response.status_code == 200

    assert (
        response.json()["message"]
        ==
        "Product deleted successfully"
    )


def test_create_product_without_permission(client):

    token = create_user_and_get_token(
        client,
        role="employee"
    )

    response = client.post(
        "/products/",
        json=product_payload(),
        headers=auth_header(token)
    )

    assert response.status_code == 403