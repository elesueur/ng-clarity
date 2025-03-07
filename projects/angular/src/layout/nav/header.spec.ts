/*
 * Copyright (c) 2016-2023 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClrIconModule } from '../../icon/icon.module';
import { MainContainerWillyWonka } from './chocolate/main-container-willy-wonka';
import { ClrNavigationModule } from './navigation.module';

@Component({
  template: `
    <clr-header class="header">
      <div class="branding">
        <a href="#" class="nav-link">
          <cds-icon shape="vm-bug"></cds-icon>
          <span class="title">Title</span>
        </a>
      </div>
      <div class="header-nav" [clr-nav-level]="1">
        <a class="active nav-link" href="javascript://"><span class="nav-text">Components</span></a>
      </div>
      <div class="header-nav" [clr-nav-level]="2">
        <a class="active nav-link" href="javascript://"><span class="nav-text">About</span></a>
      </div>
    </clr-header>
  `,
})
class TestComponent {}

describe('Header', () => {
  let fixture: ComponentFixture<any>;
  let compiled: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ClrNavigationModule, ClrIconModule],
      declarations: [TestComponent],
      providers: [MainContainerWillyWonka],
    });

    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    compiled = fixture.nativeElement;
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('projects content', () => {
    expect(compiled.textContent).toMatch(/Title/);
    expect(compiled.textContent).toMatch(/Components/);
  });

  it('has role="banner" by default', () => {
    expect(compiled.querySelector('clr-header').getAttribute('role')).toBe('banner');
  });

  it('shows the hamburger trigger when the level1 directive is registered', () => {
    expect(compiled.querySelector('.header-hamburger-trigger')).not.toBeNull();
  });

  it('shows the overflow trigger when the level2 directive is registered', () => {
    expect(compiled.querySelector('.header-overflow-trigger')).not.toBeNull();
  });

  it('should have aria labels for menu buttons', () => {
    expect(compiled.querySelector('.header-hamburger-trigger').getAttribute('aria-label')).toBe('Navigation menu');
    expect(compiled.querySelector('.header-overflow-trigger').getAttribute('aria-label')).toBe(
      'Navigation overflow menu'
    );
  });
});

describe('Header with custom role', () => {
  let fixture: ComponentFixture<any>;
  let nativeElement: HTMLElement;

  beforeEach(() => {
    TestBed.overrideComponent(TestComponent, {
      set: {
        template: '<clr-header role="generic"></clr-header>',
      },
    });

    TestBed.configureTestingModule({
      declarations: [TestComponent],
    });

    fixture = TestBed.createComponent(TestComponent);
    nativeElement = fixture.nativeElement;
  });

  it('uses provided custom role', () => {
    expect(nativeElement.querySelector('clr-header').getAttribute('role')).toBe('generic');
  });
});

describe('Header without role', () => {
  let fixture: ComponentFixture<any>;
  let nativeElement: HTMLElement;

  beforeEach(() => {
    TestBed.overrideComponent(TestComponent, {
      set: {
        template: '<clr-header [role]="undefined"></clr-header>',
      },
    });

    TestBed.configureTestingModule({
      declarations: [TestComponent],
    });

    fixture = TestBed.createComponent(TestComponent);
    nativeElement = fixture.nativeElement;
  });

  it('does not have a role attribute', () => {
    expect(nativeElement.querySelector('clr-header').hasAttribute('role')).toBe(false);
  });
});
