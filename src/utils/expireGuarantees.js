const GuaranteeModel = require("../db/models/guarantee");

const expireGuarantees = async () => {

    const guarantees = await GuaranteeModel.findAll()

    const deleteGuaranteesArray = []

    for (guarantee of guarantees) {
        if (guarantee.timePassed < 4) {
            await GuaranteeModel.update({ timePassed: guarantee.timePassed + 1 }, { where: { id: guarantee.id } })
        } else {
            deleteGuaranteesArray.push(guarantee.id)
        }
    }

    await GuaranteeModel.destroy({ where: { id: deleteGuaranteesArray}})
}

module.exports.expireGuarantees = expireGuarantees;
