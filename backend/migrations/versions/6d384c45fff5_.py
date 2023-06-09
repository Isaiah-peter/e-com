"""empty message

Revision ID: 6d384c45fff5
Revises: 6e360964c42a
Create Date: 2023-04-21 05:16:47.017927

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '6d384c45fff5'
down_revision = '6e360964c42a'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('product_qties', schema=None) as batch_op:
        batch_op.add_column(sa.Column('ordered', sa.Boolean(), nullable=False))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('product_qties', schema=None) as batch_op:
        batch_op.drop_column('ordered')

    # ### end Alembic commands ###
