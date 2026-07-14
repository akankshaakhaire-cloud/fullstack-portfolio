from sqlalchemy.orm import Session

from app.repositories.dashboard import get_dashboard_stats


# ======================================================
# DASHBOARD SERVICE
# ======================================================
def dashboard_stats(db: Session):
    return get_dashboard_stats(db)