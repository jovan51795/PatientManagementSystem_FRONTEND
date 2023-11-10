import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordFromComponent } from './record-from.component';

describe('RecordFromComponent', () => {
    let component: RecordFromComponent;
    let fixture: ComponentFixture<RecordFromComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [RecordFromComponent],
        });
        fixture = TestBed.createComponent(RecordFromComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
