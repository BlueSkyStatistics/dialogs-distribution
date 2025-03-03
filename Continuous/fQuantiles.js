/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */







class fQuantiles extends baseModal {
    static dialogId = 'fQuantiles'
    static t = baseModal.makeT(fQuantiles.dialogId)

    constructor() {
        var config = {
            id: fQuantiles.dialogId,
            label: fQuantiles.t('title'),
            modalType: "one",
            RCode: `
            local(
                {
                result = stats::qf(c({{selected.varvals | safe}}), df1={{selected.dfnumerator | safe}}, df2={{selected.dfdenominator | safe}}, lower.tail={{selected.a | safe}} )
                print(result)
                }
                )
                `
        }
        var objects = {
            varvals: {
                el: new input(config, {
                    no: 'varvals',
                    label: fQuantiles.t('varvals'),
                    required: true,
                    placeholder: "",
                    extraction: "TextAsIs",
                    allow_spaces:true,
                    value: ""
                })
            },
            dfnumerator: {
                el: new input(config, {
                    no: 'dfnumerator',
                    label: fQuantiles.t('dfnumerator'),
                    required: true,
                    placeholder: "0",
                    allow_spaces:true,
                    type : "numeric",
                    extraction: "TextAsIs",
                    value: ""
                })
            },
            dfdenominator: {
                el: new input(config, {
                    no: 'dfdenominator',
                    label: fQuantiles.t('dfdenominator'),
                    required: true,
                    placeholder: "0",
                    allow_spaces:true,
                    type : "numeric",
                    extraction: "TextAsIs",
                    value: ""
                })
            },
            labelSig: { el: new labelVar(config, { label: fQuantiles.t('labelSig'), style: "mt-3",h: 6 }) },
            lowtail: { el: new radioButton(config, { label: fQuantiles.t('lowtail'), no: "a", increment: "TRUE", value: "TRUE", state: "checked", extraction: "ValueAsIs" }) },
            uptail: { el: new radioButton(config, { label: fQuantiles.t('uptail'), no: "a", increment: "FALSE", value: "FALSE", state: "", extraction: "ValueAsIs" }) }
        }
        const content = {
            items: [objects.varvals.el.content, objects.dfnumerator.el.content, objects.dfdenominator.el.content, objects.labelSig.el.content, objects.lowtail.el.content, objects.uptail.el.content],
            nav: {
                name: fQuantiles.t('navigation'),
                icon: "icon-f-q",
                datasetRequired: false,
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: fQuantiles.t('help.title'),
            r_help: fQuantiles.t('help.r_help'),  //r_help: "help(data,package='utils')",
            body: fQuantiles.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new fQuantiles().render()
}
