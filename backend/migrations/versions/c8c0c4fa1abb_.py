"""empty message

Revision ID: c8c0c4fa1abb
Revises: 6d384c45fff5
Create Date: 2023-04-21 08:10:29.388054

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'c8c0c4fa1abb'
down_revision = '6d384c45fff5'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('product_qties', schema=None) as batch_op:
        batch_op.add_column(sa.Column('color', sa.String(), nullable=False))
        batch_op.add_column(sa.Column('size', sa.String(), nullable=False))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('product_qties', schema=None) as batch_op:
        batch_op.drop_column('size')
        batch_op.drop_column('color')

    # ### end Alembic commands ###
