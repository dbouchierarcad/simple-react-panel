import React, { PureComponent } from 'react';
import { PanelOptionsGroup } from '@grafana/ui';
import { PanelEditorProps } from '@grafana/data'; 

import { SimpleOptions } from './types';

export class SimpleEditor extends PureComponent<PanelEditorProps<SimpleOptions>> {
  onTextChanged = ({ target }: any) => {
    this.props.onOptionsChange({ ...this.props.options, text: target.value });
  };

  render() {
    //const { options } = this.props;

    return (
      <PanelOptionsGroup title="ARCAD panel" >
      <div className="section gf-form-group">
        <h5 className="section-heading">Display</h5>
         </div>
      </PanelOptionsGroup>
    );
  }
}
