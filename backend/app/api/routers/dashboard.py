from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.api.dependencies.auth import require_role

from app.schemas.dashboard import DashboardStats
from app.services.dashboard import dashboard_stats


router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"],
)


# ======================================================
# DASHBOARD STATS
# ======================================================
@router.get(
    "/stats",
    response_model=DashboardStats,
)
def get_dashboard_stats(
    db: Session = Depends(get_db),
    current_user=Depends(
        require_role(
            "admin",
            "manager",
            "employee",
        )
    ),
):
    return dashboard_stats(db)