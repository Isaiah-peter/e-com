"""empty message

Revision ID: 94798c9072d8
Revises: e12c9e309f51
Create Date: 2023-04-25 13:19:07.219832

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = '94798c9072d8'
down_revision = 'e12c9e309f51'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('product_qties', schema=None) as batch_op:
        batch_op.add_column(sa.Column('price', sa.Float(), nullable=False))
        batch_op.drop_column('prize')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('product_qties', schema=None) as batch_op:
        batch_op.add_column(sa.Column('prize', postgresql.DOUBLE_PRECISION(precision=53), autoincrement=False, nullable=False))
        batch_op.drop_column('price')

    # ### end Alembic commands ###
