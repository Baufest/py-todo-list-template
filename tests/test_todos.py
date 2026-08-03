import pytest


# ---------------------------------------------------------------------------
# POST /todos/
# ---------------------------------------------------------------------------

class TestCreateTodo:
    def test_create_todo_returns_201(self, client):
        response = client.post("/todos/", json={"title": "Comprar leche"})
        assert response.status_code == 201

    def test_create_todo_returns_expected_fields(self, client):
        response = client.post("/todos/", json={"title": "Comprar leche"})
        data = response.json()
        assert data["title"] == "Comprar leche"
        assert data["description"] is None
        assert data["completed"] is False
        assert "id" in data
        assert "created_at" in data
        assert "updated_at" in data

    def test_create_todo_with_description(self, client):
        response = client.post(
            "/todos/",
            json={"title": "Ir al gimnasio", "description": "Llevar botella de agua"},
        )
        data = response.json()
        assert response.status_code == 201
        assert data["description"] == "Llevar botella de agua"

    def test_create_todo_assigns_unique_ids(self, client):
        id1 = client.post("/todos/", json={"title": "Tarea 1"}).json()["id"]
        id2 = client.post("/todos/", json={"title": "Tarea 2"}).json()["id"]
        assert id1 != id2

    def test_create_todo_missing_title_returns_422(self, client):
        response = client.post("/todos/", json={"description": "Sin título"})
        assert response.status_code == 422

    def test_create_todo_empty_body_returns_422(self, client):
        response = client.post("/todos/", json={})
        assert response.status_code == 422


# ---------------------------------------------------------------------------
# GET /todos/
# ---------------------------------------------------------------------------

class TestListTodos:
    def test_list_todos_empty_returns_empty_list(self, client):
        response = client.get("/todos/")
        assert response.status_code == 200
        assert response.json() == []

    def test_list_todos_returns_all_created(self, client):
        client.post("/todos/", json={"title": "Tarea A"})
        client.post("/todos/", json={"title": "Tarea B"})
        response = client.get("/todos/")
        assert response.status_code == 200
        assert len(response.json()) == 2

    def test_list_todos_filter_completed_true(self, client):
        client.post("/todos/", json={"title": "Pendiente"})
        todo = client.post("/todos/", json={"title": "Completada"}).json()
        client.put(f"/todos/{todo['id']}", json={"completed": True})

        response = client.get("/todos/?completed=true")
        todos = response.json()
        assert response.status_code == 200
        assert all(t["completed"] is True for t in todos)
        assert len(todos) == 1

    def test_list_todos_filter_completed_false(self, client):
        client.post("/todos/", json={"title": "Pendiente"})
        todo = client.post("/todos/", json={"title": "Completada"}).json()
        client.put(f"/todos/{todo['id']}", json={"completed": True})

        response = client.get("/todos/?completed=false")
        todos = response.json()
        assert response.status_code == 200
        assert all(t["completed"] is False for t in todos)
        assert len(todos) == 1

    def test_list_todos_no_filter_returns_all(self, client):
        client.post("/todos/", json={"title": "Pendiente"})
        todo = client.post("/todos/", json={"title": "Completada"}).json()
        client.put(f"/todos/{todo['id']}", json={"completed": True})

        response = client.get("/todos/")
        assert len(response.json()) == 2


# ---------------------------------------------------------------------------
# GET /todos/{todo_id}
# ---------------------------------------------------------------------------

class TestGetTodo:
    def test_get_existing_todo_returns_200(self, client):
        created = client.post("/todos/", json={"title": "Mi tarea"}).json()
        response = client.get(f"/todos/{created['id']}")
        assert response.status_code == 200

    def test_get_existing_todo_returns_correct_data(self, client):
        created = client.post(
            "/todos/",
            json={"title": "Mi tarea", "description": "Detalle"},
        ).json()
        data = client.get(f"/todos/{created['id']}").json()
        assert data["id"] == created["id"]
        assert data["title"] == "Mi tarea"
        assert data["description"] == "Detalle"

    def test_get_nonexistent_todo_returns_404(self, client):
        response = client.get("/todos/99999")
        assert response.status_code == 404

    def test_get_todo_after_delete_returns_404(self, client):
        created = client.post("/todos/", json={"title": "Borrar"}).json()
        client.delete(f"/todos/{created['id']}")
        response = client.get(f"/todos/{created['id']}")
        assert response.status_code == 404


# ---------------------------------------------------------------------------
# PUT /todos/{todo_id}
# ---------------------------------------------------------------------------

class TestUpdateTodo:
    def test_update_title(self, client):
        created = client.post("/todos/", json={"title": "Original"}).json()
        response = client.put(f"/todos/{created['id']}", json={"title": "Modificado"})
        assert response.status_code == 200
        assert response.json()["title"] == "Modificado"

    def test_update_description(self, client):
        created = client.post("/todos/", json={"title": "Tarea"}).json()
        response = client.put(
            f"/todos/{created['id']}", json={"description": "Nueva descripción"}
        )
        assert response.json()["description"] == "Nueva descripción"

    def test_update_completed_to_true(self, client):
        created = client.post("/todos/", json={"title": "Tarea"}).json()
        response = client.put(f"/todos/{created['id']}", json={"completed": True})
        assert response.status_code == 200
        assert response.json()["completed"] is True

    def test_update_completed_to_false(self, client):
        created = client.post("/todos/", json={"title": "Tarea"}).json()
        client.put(f"/todos/{created['id']}", json={"completed": True})
        response = client.put(f"/todos/{created['id']}", json={"completed": False})
        assert response.json()["completed"] is False

    def test_update_multiple_fields_at_once(self, client):
        created = client.post("/todos/", json={"title": "Original"}).json()
        response = client.put(
            f"/todos/{created['id']}",
            json={"title": "Nuevo", "description": "Desc", "completed": True},
        )
        data = response.json()
        assert data["title"] == "Nuevo"
        assert data["description"] == "Desc"
        assert data["completed"] is True

    def test_update_nonexistent_todo_returns_404(self, client):
        response = client.put("/todos/99999", json={"title": "Nada"})
        assert response.status_code == 404

    def test_update_preserves_unchanged_fields(self, client):
        created = client.post(
            "/todos/", json={"title": "Original", "description": "Desc original"}
        ).json()
        client.put(f"/todos/{created['id']}", json={"title": "Nuevo título"})
        data = client.get(f"/todos/{created['id']}").json()
        assert data["description"] == "Desc original"

    def test_update_empty_body_preserves_all_fields(self, client):
        created = client.post(
            "/todos/", json={"title": "Sin cambios", "description": "Detalle"}
        ).json()
        response = client.put(f"/todos/{created['id']}", json={})
        data = response.json()
        assert data["title"] == "Sin cambios"
        assert data["description"] == "Detalle"
        assert data["completed"] is False


# ---------------------------------------------------------------------------
# DELETE /todos/{todo_id}
# ---------------------------------------------------------------------------

class TestDeleteTodo:
    def test_delete_existing_todo_returns_204(self, client):
        created = client.post("/todos/", json={"title": "Borrar"}).json()
        response = client.delete(f"/todos/{created['id']}")
        assert response.status_code == 204

    def test_delete_removes_todo_from_list(self, client):
        created = client.post("/todos/", json={"title": "Borrar"}).json()
        client.delete(f"/todos/{created['id']}")
        todos = client.get("/todos/").json()
        assert all(t["id"] != created["id"] for t in todos)

    def test_delete_nonexistent_todo_returns_404(self, client):
        response = client.delete("/todos/99999")
        assert response.status_code == 404

    def test_delete_does_not_affect_other_todos(self, client):
        keep = client.post("/todos/", json={"title": "Conservar"}).json()
        remove = client.post("/todos/", json={"title": "Borrar"}).json()
        client.delete(f"/todos/{remove['id']}")
        response = client.get(f"/todos/{keep['id']}")
        assert response.status_code == 200
        assert response.json()["title"] == "Conservar"
