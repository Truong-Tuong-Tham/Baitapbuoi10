import  { Sequelize } from 'sequelize';

const sequelize = new Sequelize (
'app_food',
'root',
'123456',
{
    host: 'localhost',
    port: 3307,
    dialect: 'mysql'

}
)
export default sequelize