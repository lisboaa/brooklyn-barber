import { container } from 'tsyringe'

import IStorageProvider from './StorageProvider/models/IStorageProvider';
import DiskStorageProvider  from './StorageProvider/implementations/DiskStorageProvider';

import IMailProvider from './MailProvider/Models/IMailProvider';
import EtherealMailProvider  from './MailProvider/Implementations/EtherealMailProvider';

import IMailTemplateProvider from './MailTemplateProvider/models/IMailTemplateProvider';
import HandlebarsMailTemplateProvider  from './MailTemplateProvider/implementations/HandlebarsMailTemplateProvider';

container.registerSingleton<IStorageProvider> (
    'StorageProvider',
    DiskStorageProvider,
);

container.registerSingleton<IMailTemplateProvider> (
    'MailTemplateProvider',
    HandlebarsMailTemplateProvider,
);

container.registerInstance<IMailProvider> (
    'MailProvider',
    container.resolve(EtherealMailProvider),
);