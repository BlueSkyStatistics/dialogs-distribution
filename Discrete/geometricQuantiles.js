/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */







class geometricQuantiles extends baseModal {
    static dialogId = 'geometricQuantiles'
    static t = baseModal.makeT(geometricQuantiles.dialogId)

    constructor() {
        var config = {
            id: geometricQuantiles.dialogId,
            label: geometricQuantiles.t('title'),
            modalType: "one",
            RCode: `
                    local(
                        {
                        result = stats::qgeom(c({{selected.varvals | safe}}), prob={{selected.prob | safe}}, lower.tail={{selected.a | safe}} )
                        print(result)
                        }
                        )                    
                `
        }
        var objects = {
            varvals: {
                el: new input(config, {
                    no: 'varvals',
                    label: geometricQuantiles.t('varvals'),
                    required: true,
                    placeholder: "",
                    extraction: "TextAsIs",
                    allow_spaces:true,
                    value: ""
                })
            },
            prob: {
                el: new input(config, {
                    no: 'prob',
                    label: geometricQuantiles.t('prob'),
                    required: true,
                    placeholder: "0.5",
                    allow_spaces:true,
                    type : "numeric",
                    extraction: "TextAsIs",
                    value: "0.5"
                })
            },
            labelSig: { el: new labelVar(config, { label: geometricQuantiles.t('labelSig'), style: "mt-3",h: 6 }) },
            lowtail: { el: new radioButton(config, { label: geometricQuantiles.t('lowtail'), no: "a", increment: "TRUE", value: "TRUE", state: "checked", extraction: "ValueAsIs" }) },
            uptail: { el: new radioButton(config, { label: geometricQuantiles.t('uptail'), no: "a", increment: "FALSE", value: "FALSE", state: "", extraction: "ValueAsIs" }) }
        }
        const content = {
            items: [objects.varvals.el.content, objects.prob.el.content, objects.labelSig.el.content, objects.lowtail.el.content, objects.uptail.el.content],
            nav: {
                name: geometricQuantiles.t('navigation'),
                icon: "icon-area-chart-q",
                datasetRequired: false,
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: geometricQuantiles.t('help.title'),
            r_help: geometricQuantiles.t('help.r_help'),  //r_help: "help(data,package='utils')",
            body: geometricQuantiles.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new geometricQuantiles().render()
}
